"""Models and functions for the demo package."""

from math import floor
import numpy as np
from flask import url_for


def get_urls() -> dict:
    """Return urls to be used in the template by the Javascript code."""
    urls = dict()
    urls['init_params_url'] = url_for('demo.init_params')
    urls['random_params_url'] = url_for('demo.random_params')
    urls['get_data_url'] = url_for('demo.get_data')

    return urls


def init_params(rand: bool = False) -> dict:
    """Return a dictionary of the classifier parameters.
    :param bool rand: when set to Flase, the returned parameters are always
    the same.
    """
    if not rand:
        weights = [[1, 2], [2, -4], [2, -1]]
        biases = [0, 0.5, -0.5]
    else:
        weights = (10 * np.random.random_sample((3, 2)) - 5).tolist()
        biases = (1 * np.random.random_sample((3,)) - .5).tolist()
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
            sample = (2 * np.random.random_sample((2,)) - 1).tolist()
            label = floor(i / 3)
            sample.append(label)
            result.append(sample)
    return result
