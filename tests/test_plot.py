"""Tests for the plot module."""

import numpy as np

from app.demo.plot import (
    model,
    get_perp,
    prepare_data,
    generate_plot_image_string
)
from app.demo.plot import offset as plot_offset


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
    assert dx == plot_offset
    assert dy == 0.0625

    params = np.array([0, -1, 10])
    x_mid, y_mid, dx, dy = get_perp(x_min, x_max, params)

    assert x_mid == 7
    assert y_mid == 0
    assert dx == plot_offset
    assert dy < -100

    params = np.array([-4, 0, 10])
    x_mid, y_mid, dx, dy = get_perp(x_min, x_max, params)

    assert x_mid == 7
    assert y_mid > 100
    assert dx == plot_offset
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
