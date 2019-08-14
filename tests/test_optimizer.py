"""Tests for the optimizer module."""
import numpy as np
from numpy import ndarray
from typing import Tuple
from pytest import approx

from app.demo.optimizer import (get_scores, grad_step)


def prep_data() -> Tuple[ndarray, ndarray, ndarray]:
    """Prepare data for the test."""
    data = np.array([
        [0.5, 0.4, 0],
        [0.8, 0.3, 0],
        [0.3, 0.8, 0],
        [-0.4, 0.3, 1],
        [-0.3, 0.7, 1],
        [-0.7, 0.2, 1],
        [0.7, -0.4, 2],
        [0.5, -0.6, 2],
        [-0.4, -0.5, 2]
    ])

    labels = data[:, 2].astype(int)

    params = np.array([[1, 2, 0], [2, -4, 0.5], [3, -1, -0.5]])
    return data, labels, params


def test_get_scores():
    """Test the generation of class scores."""
    params = np.array([[1, 1, 1], [2, 2, 2]])
    data = np.array([[3, 3], [4, 4]])

    scores = get_scores(data, params)
    assert scores.shape == (2, 2)
    assert scores[0][0] == 7
    assert scores[0][1] == 14
    assert scores[1][0] == 9
    assert scores[1][1] == 18


def test_grad_step_ova():
    """Test the grad_step function with the OVA loss."""
    data, labels, params = prep_data()

    grad_w, grad_b, cost_loss, loss, scores, total_loss, reg_loss = \
        grad_step(data, labels, params, 'ova')

    assert grad_w.shape == (3, 2)
    """
    assert grad_w[0, 0] == approx(-0.2)
    assert grad_w[0, 1] == approx(0.2)
    assert grad_w[1, 0] == approx(3.5)
    assert grad_w[1, 1] == approx(-2)
    assert grad_w[2, 0] == approx(2)
    assert grad_w[2, 1] == approx(2)

    assert grad_b.shape == (3, 1)
    assert grad_b[0, 0] == 5
    assert grad_b[1, 0] == 2
    assert grad_b[2, 0] == 2
    """
    assert round(grad_w[0, 0], 4) == 0.0278
    assert round(grad_w[0, 1], 4) == 0.1222
    assert round(grad_w[1, 0], 4) == 0.4889
    assert round(grad_w[1, 1], 4) == -0.4222
    assert round(grad_w[2, 0], 4) == 0.3722
    assert round(grad_w[2, 1], 4) == 0.1722

    assert grad_b.shape == (3, 1)
    assert round(grad_b[0, 0], 4) == 0.5556
    assert round(grad_b[1, 0], 4) == 0.2222
    assert round(grad_b[2, 0], 4) == 0.2222

    assert round(reg_loss, 4) == 3.5000
    assert round(total_loss, 4) == 7.5222

def test_grad_step_ww():
    """Test the grad_step function with the Weston Watkins loss."""
    data, labels, params = prep_data()

    grad_w, grad_b, cost_loss, loss, scores, total_loss, reg_loss = \
        grad_step(data, labels, params, 'ww')

    assert grad_w.shape == (3, 2)
    assert grad_w[0, 0] == approx(-3.9)
    assert grad_w[0, 1] == approx(-0.3)
    assert grad_w[1, 0] == approx(3.7)
    assert grad_w[1, 1] == approx(-3.4)
    assert grad_w[2, 0] == approx(0.2)
    assert grad_w[2, 1] == approx(3.7)

    assert grad_b.shape == (3, 1)
    assert grad_b[0, 0] == 1
    assert grad_b[1, 0] == -1
    assert grad_b[2, 0] == 0

