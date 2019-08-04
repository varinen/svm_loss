"""Models and functions for the demo package."""

from flask import url_for


def get_urls() -> dict:
    """Return urls to be used in the template by the Javascript code."""
    urls = dict()
    urls['init_prams_url'] = url_for('demo.init_params')

    return urls


def init_params() -> dict:
    """Return a dictionary of the initial parameters."""
    weights = [[1, 2], [2, -4], [2, -1]]
    biases = [0, 0.5, -0.5]
    params = {
        'weights': weights,
        'biases': biases
    }

    return params
