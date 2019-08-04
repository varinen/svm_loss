"""Models and functions for the demo package."""

import numpy as np
from flask import url_for


def get_urls() -> dict:
    """Return urls to be used in the template by the Javascript code."""
    urls = dict()
    urls['init_params_url'] = url_for('demo.init_params')
    urls['random_params_url'] = url_for('demo.random_params')

    return urls


def init_params(rand=False) -> dict:
    """Return a dictionary of the initial parameters."""
    if not rand:
        weights = [[1, 2], [2, -4], [2, -1]]
        biases = [0, 0.5, -0.5]
    else:
        weights = (10 * np.random.random_sample((3, 2)) - 5).tolist()
        biases = (1 * np.random.random_sample((3, )) - .5).tolist()
    params = {
        'weights': weights,
        'biases': biases
    }

    return params
