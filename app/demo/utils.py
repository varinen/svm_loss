"""Models and functions for the demo package."""

from io import BytesIO
import base64
from math import floor
import numpy as np
from numpy import ndarray
import matplotlib
import matplotlib.pyplot as plt

from flask import url_for

colors = ['black', 'white', 'red']


def is_int(s) -> bool:
    """Check if the value is an Integer."""
    if s is None:
        return False
    try:
        int(s)
        return True
    except ValueError:
        return False


def get_urls() -> dict:
    """Return urls to be used in the template by the Javascript code."""
    urls = dict()
    urls['get_params_url'] = url_for('demo.get_params')
    urls['get_data_url'] = url_for('demo.get_data')
    urls['get_plot_url'] = url_for('demo.get_plot')

    return urls


def init_params(rand: bool = False) -> dict:
    """Return a dictionary of the classifier parameters.
    :param bool rand: when set to False, the returned parameters are always
    the same.
    """
    if not rand:
        weights = [[1, 2], [2, -4], [2, -1]]
        biases = [0, 0.5, -0.5]
    else:
        weights = np.round_((10 * np.random.random_sample((3, 2)) - 5),
                            2).tolist()
        biases = np.round_((1 * np.random.random_sample((3,)) - .5), 2).tolist()
    params = {
        'weights': weights,
        'biases': biases
    }

    return params


def init_data(rand: bool = False) -> list:
    """Return the training data as a list with the last element in each
    sample being that sample's label."""
    if not rand:
        result = [
            [0.5, 0.4, 0],
            [0.8, 0.3, 0],
            [0.3, 0.8, 0],
            [-0.4, 0.3, 1],
            [-0.3, 0.7, 1],
            [-0.7, 0.2, 1],
            [0.7, -0.4, 2],
            [0.5, -0.6, 2],
            [-0.4, -0.5, 2]
        ]
    else:
        result = []
        for i in range(0, 9):
            sample = np.round_((2 * np.random.random_sample((2,)) - 1),
                               2).tolist()
            label = floor(i / 3)
            sample.append(label)
            result.append(sample)

    return result


def model_scores(data: ndarray, params: ndarray) -> ndarray:
    """Return scores for different classes computed for the data using
    linear function parameters.

    :param data: training data
    :param params: a matrix of parameters for three classes
    """
    # Add a bias unit of 1 to the data
    biased_data = np.ones((data.shape[0], data.shape[1] + 1))
    biased_data[:, :-1] = data

    # Multiply training data by the class weights
    z = np.dot(biased_data, np.transpose(params))
    return z


def model(data: ndarray, params: ndarray) -> ndarray:
    """Predict the class using the highest class score."""
    d = model_scores(data, params)
    z = d.argmax(axis=1)
    return z


def plot_params(plt_: matplotlib.pyplot, params: ndarray, x_min: float,
                x_max: float):
    """Plot decision boundaries, parameters and gradients."""
    for i, param_set in enumerate(params):
        x = np.linspace(x_min, x_max, num=2)
        if param_set[1] == 0:
            param_set[1] = 1e-10

        y = -1 * (param_set[0] * x + param_set[2]) / param_set[1]

        color = colors[i]

        plt_.plot(x, y, c=color)

        # Generate data to plot the gradient
        x_arr, y_arr, dx_arr, dy_arr = get_perp(x_min, x_max, param_set)

        plt_.arrow(x_arr, y_arr, dx_arr, dy_arr, color=color,
                   shape='full', head_width=0.05)


def get_perp(x_min: float, x_max: float, params: ndarray) -> tuple:
    """Generate  coordinates and lengths of a perpendicular that passes
    through a line define by params in a point with x coordinate in the middle
    between x_min and x_max."""
    # the offset of the perpendicular's end x coordinate from its start
    # x coordinate
    offset = .25
    x_mid = (x_min + x_max) / 2

    # avoid division by zero
    div_ = params[0]
    if div_ == 0:
        div_ = 1e-100

    # Define the slope of the perpendicular as the inverse of the original
    #  line's x and y slopes
    b = params[1] / div_

    div_2 = params[1]
    if div_2 == 0:
        div_2 = 1e-100

    # calculate the y coordinate of the perpendicular's starting point
    y_mid = -1 * (params[0] * x_mid + params[2]) / div_2

    c = y_mid - b * x_mid

    # Calculate the offset of the perpendicular's end point from its start point
    dx = offset
    y_mid = x_mid * b + c
    dy = (x_mid + offset) * b + c - y_mid

    return x_mid, y_mid, dx, dy


def prepare_data(data: ndarray, h: float = 0.005) -> tuple:
    """Prepares the training data to be plotted.

    :param data: a numpy array with at 2 columns representing
    x and y coordinates and the third column representing the class label
    :param h: step to generate a meshgrid
    """
    # assumed the first two columns contain x0 and x1 variables that
    # will become x and y coordinates
    x_ = data[:, :2]
    # labels
    y_ = data[:, 2]

    x_min, x_max = x_[:, 0].min() - 1, x_[:, 0].max() + 1
    y_min, y_max = x_[:, 1].min() - 1, x_[:, 1].max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
                         np.arange(y_min, y_max, h))
    return xx, yy, x_min, x_max, y_min, y_max, x_, y_


def generate_plot_image_string(data: ndarray, params: ndarray) -> str:
    """Generates a base64 image string to be outputted into the UI."""
    xx, yy, x_min, x_max, y_min, y_max, x_, y_ = prepare_data(data)
    z = model(np.c_[xx.ravel(), yy.ravel()], params)

    z = z.reshape(xx.shape)
    plt.figure(figsize=(10, 10))
    plt.tight_layout()
    matplotlib.rc('xtick', labelsize=10)
    matplotlib.rc('ytick', labelsize=10)

    plt.contourf(xx, yy, z, cmap=plt.cm.tab20)
    plt.axis('equal')
    plt.xlim(x_min, x_max)
    plt.ylim(y_min, y_max)
    ax = plt.gca()
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_visible(False)
    ax.spines['left'].set_visible(False)

    plot_params(plt, params, x_min, x_max)

    # plot the training points
    plt.scatter(x_[:, 0], x_[:, 1], c=y_, s=100, cmap=plt.cm.tab20)

    figfile = BytesIO()
    plt.savefig(figfile, format='png')
    # rewind to the beginning of the file
    figfile.seek(0)

    figdata_png = base64.b64encode(figfile.getvalue())

    return figdata_png.decode('utf-8')
