"""Tests for the utils module."""

import numpy as np
from pytest import approx
from app.demo.utils import *


def test_get_urls(app):
    """Test the get_urls function."""
    with app.app_context():
        result = get_urls()
        assert isinstance(result, dict)
        assert len(result) > 0
        assert result['init_params_url']
        assert 'init_params' in result['init_params_url']
        assert result['random_params_url']
        assert 'random_params' in result['random_params_url']


def test_init_params(app):
    """Test the init_params function."""
    with app.app_context():
        result = init_params()

        assert isinstance(result, dict)
        assert result['weights']
        assert result['biases']
        assert len(result['weights']) == 3
        assert len(result['weights'][0]) == 2
        assert len(result['weights'][1]) == 2
        assert len(result['biases']) == 3

        result = init_params(True)
        assert isinstance(result, dict)
        assert result['weights']
        assert result['biases']
        assert len(result['weights']) == 3
        assert len(result['weights'][0]) == 2
        assert len(result['weights'][1]) == 2
        assert len(result['biases']) == 3


def test_init_data():
    """Test the data generation by the init_data function."""
    rands = [True, False]

    for rand in rands:
        result = init_data(rand)

        assert isinstance(result, list)
        assert len(result) == 9
        for i in result:
            assert len(i) == 3


def test_model_scores():
    """Test the generation of class scores."""
    params = np.array([[1, 1, 1], [2, 2, 2]])
    data = np.array([[3, 3], [4, 4]])

    scores = model_scores(data, params)
    assert scores.shape == (2, 2)
    assert scores[0][0] == 7
    assert scores[0][1] == 14
    assert scores[1][0] == 9
    assert scores[1][1] == 18


def test_model():
    """Test the class prediction based on the highest score."""
    params = np.array([[1, 1, 1], [2, 2, 2]])
    data = np.array([[3, 3], [4, 4]])

    preds = model(data, params)
    assert preds.shape == (2,)
    assert preds[0] == 1
    assert preds[1] == 1


def test_get_perp():
    """Test the generation of parameters of a perpendicular to a line defined
    by params."""
    params = np.array([-4, -1, 10])
    x_min = 0
    x_max = 14

    x_mid, y_mid, dx, dy = get_perp(x_min, x_max, params)

    assert x_mid == 7
    assert y_mid == -18
    assert dx == 0.5
    assert dy == 0.125

    params = np.array([0, -1, 10])
    x_mid, y_mid, dx, dy = get_perp(x_min, x_max, params)

    assert x_mid == 7
    assert y_mid == 0
    assert dx == 0.5
    assert dy < -100

    params = np.array([-4, 0, 10])
    x_mid, y_mid, dx, dy = get_perp(x_min, x_max, params)

    assert x_mid == 7
    assert y_mid > 100
    assert dx == 0.5
    assert dy == 0

    assert True


def test_prepare_data():
    """Test the generation of meshgrid coordinates."""
    data = np.array([[3, 3, 1], [4, 4, 2]])
    xx, yy, x_min, x_max, y_min, y_max, x_, y_ = prepare_data(data, 0.005)
    assert xx.shape == (600, 600)
    assert yy.shape == (600, 600)
    assert x_max == 5
    assert x_min == 2
    assert y_min == 2
    assert y_max == 5
    assert x_.shape == (2, 2)
    assert y_.shape == (2,)


def test_generate_plot_image_string():
    """Generate the ability to produce a string representing plotted data."""
    data = np.array([[3, 3, 1], [4, 4, 2]])
    params = np.array([[1, 1, 1], [2, 2, 2]])

    str_ = generate_plot_image_string(data, params)
    assert len(str_) > 0
