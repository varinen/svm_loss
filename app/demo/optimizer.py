"""Gradient calculation and update, loss calculation."""

from typing import Tuple
import numpy as np
from numpy import ndarray


def get_scores(data: ndarray, params: ndarray) -> ndarray:
    """Return scores for different classes computed for the data using
    linear function parameters.

    :param data: training data
    :param params: a matrix of parameters (weights and biases) for three classes
    """
    # Add a bias unit of 1 to the data
    biased_data = np.ones((data.shape[0], data.shape[1] + 1))
    biased_data[:, :-1] = data

    # Multiply training data by the class weights
    scores = np.dot(biased_data, np.transpose(params))
    return scores


def grad_step(data: ndarray, labels: ndarray, params: ndarray,
              loss_type: str, reg_c: float = 0.1) -> \
        Tuple[ndarray, ndarray, float, list, ndarray, float, float]:
    """Calculate new gradients, losses, and scores.

    :param data: training data
    :param params: current weight and bases values
    :param labels: labels of the training data
    :param loss_type: string to choose the loss function formulation
    with values 'ww' (Weston Watkins 1999), 'ova' ('One-vs-All')
    :param reg_c: regularization strength
    """
    weights = params[:, :-1]
    grad_w = np.zeros((3, 2))
    grad_b = np.zeros((3, 1))
    cost_loss = 0
    loss = []

    classes = np.unique(labels).astype(int)
    scores = get_scores(data[:, :-1], params)

    for i in range(0, data.shape[0]):
        label = labels[i]
        sample_class_index, = np.where(classes == label)[0]

        sample_scores = scores[i]

        # compute losses
        if loss_type == 'ww':
            grad_w, grad_b, sample_loss = \
                ww_loss(label, classes, data[i], sample_scores, grad_w, grad_b)

        elif loss_type == 'ova':
            grad_w, grad_b, sample_loss = \
                ova_loss(label, classes, data[i], sample_scores, grad_w, grad_b)

        cost_loss += sample_loss
        loss.append(sample_loss)

    grad_w, grad_b, cost_loss, total_loss, reg_loss = norm_reg(data.shape[0],
                                                               weights, grad_w,
                                                               grad_b,
                                                               cost_loss, reg_c)

    return grad_w, grad_b, cost_loss, loss, scores, total_loss, reg_loss


def norm_reg(n: int, weights: ndarray, grad_w: ndarray, grad_b: ndarray,
             cost_loss: float, reg_c: float = 0.1) -> Tuple[
    ndarray, ndarray, float, float, float]:
    """Normalizes the elements and applies regularization to the gradients."""
    grad_b /= n
    grad_w /= n
    cost_loss /= n

    reg_loss = reg_c * np.square(weights)
    reg_loss = reg_loss.sum()
    grad_w += 0.5 * reg_c * weights

    total_loss = cost_loss + reg_loss

    return grad_w, grad_b, cost_loss, total_loss, reg_loss


def ww_loss(label: int, classes: ndarray, sample: ndarray,
            sample_scores: ndarray, grad_w: ndarray, grad_b: ndarray) \
        -> Tuple[ndarray, ndarray, float]:
    """Compute the Weston Watkins classifier loss.

    Compute the classifier loss and the new gradient values using the loss
    formulation from Weston Watkins 1999.

    :param label: id of the class to which the training sample belongs
    :param classes: vector of all class labels
    :param sample: a training sample
    :param sample_scores: a vector of class scores computed for this sample
    """
    sample_loss = 0
    sample_class_index, = np.where(classes == label)[0]

    for j in range(0, classes.shape[0]):
        if label == classes[j]:
            continue
        class_loss = max(0, sample_scores[j] -
                         sample_scores[sample_class_index] + 1)
        if class_loss > 0:
            sample_loss += class_loss
            grad_w[j, 0] += sample[0]
            grad_w[j, 1] += sample[1]
            grad_b[j] += 1

            grad_w[sample_class_index, 0] -= sample[0]
            grad_w[sample_class_index, 1] -= sample[1]
            grad_b[sample_class_index] -= 1

    return grad_w, grad_b, sample_loss


def ova_loss(label, classes, sample, sample_scores, grad_w, grad_b):
    """Compute the One-vs-All classifier loss.

    Compute the classifier loss and the new gradient values using the
    One-vs-All loss formulation.

    :param label: id of the class to which the training sample belongs
    :param classes: vector of all class labels
    :param sample: a training sample
    :param sample_scores: a vector of class scores computed for this sample
    """
    sample_class_index, = np.where(classes == label)[0]
    sample_loss = 0
    for j in range(0, classes.shape[0]):
        factor = -1
        if label == classes[j]:
            factor = 1

        class_loss = max(0, 1 - factor * sample_scores[j])
        if class_loss > 0:
            sample_loss += class_loss
            grad_w[j, 0] += -1 * factor * sample[0]
            grad_w[j, 1] += -1 * factor * sample[1]
            grad_b[j] += -1 * factor

    return grad_w, grad_b, sample_loss


def adjust_params(weights, biases, grad_w, grad_b, learning_rate) -> \
        Tuple[ndarray, ndarray]:
    """Adjust the weights and biases.

     Subtract the gradient value multiplied by the learning rate
    """
    weights = weights.astype(float)
    biases = biases.astype(float)
    weights -= grad_w * learning_rate
    biases -= grad_b * learning_rate

    return weights, biases
