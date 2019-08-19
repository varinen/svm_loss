"""Models and functions for the demo package."""

from math import floor
import numpy as np

from flask import url_for


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
    urls['get_step_url'] = url_for('demo.get_step')

    return urls


def init_params(rand: bool = False) -> dict:
    """Return a dictionary of the classifier parameters.
    :param bool rand: when set to False, the returned parameters are always
    the same.
    """
    if not rand:
        weights = [[1, 2], [2, -4], [3, -1]]
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
