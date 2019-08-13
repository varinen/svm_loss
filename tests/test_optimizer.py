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

    v_grad_w, v_grad_b, v_cost_loss, v_loss, v_scores = \
        grad_step(data, labels, params, 'ova')

    assert v_grad_w.shape == (3, 2)
    assert v_grad_w[0, 0] == approx(-0.2)
    assert v_grad_w[0, 1] == approx(0.2)
    assert v_grad_w[1, 0] == approx(3.5)
    assert v_grad_w[1, 1] == approx(-2)
    assert v_grad_w[2, 0] == approx(2)
    assert v_grad_w[2, 1] == approx(2)

    assert v_grad_b.shape == (3, 1)
    assert v_grad_b[0, 0] == 5
    assert v_grad_b[1, 0] == 2
    assert v_grad_b[2, 0] == 2

    assert True

