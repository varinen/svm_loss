"""Test suite for the Demo package."""

import json
from flask import url_for

from app.demo.utils import init_data, init_params


def test_demo_index(app, client):
    """Test the response from the index page."""
    with app.test_request_context():
        resp = client.get(url_for('demo.index'))
        assert 'Linear Classifier Demo' in str(resp.data)


def test_get_params(app, client):
    """Test the response from the init_params and random_params routes."""
    with app.app_context():
        urls = [
            url_for('demo.get_params'),
            url_for('demo.get_params', rand=1),
        ]
    with app.test_request_context():
        for url in urls:
            resp = client.get(url)
            assert resp.content_type == 'application/json'

            data = json.loads(resp.data)
            assert isinstance(data, dict)
            assert data['biases']
            assert data['weights']
            assert len(data['biases']) == 3
            assert len(data['weights']) == 3
            assert len(data['weights'][0]) == 2
            assert len(data['weights'][1]) == 2
            assert len(data['weights'][2]) == 2


def test_get_data_params(app, client):
    """Test the data generation with the get_data route."""
    with app.app_context():
        urls = [
            url_for('demo.get_data'),
            url_for('demo.get_data', rand=1)
        ]
    with app.test_request_context():
        for url in urls:
            resp = client.get(url)
            assert resp.content_type == 'application/json'
            data = json.loads(resp.data)
            assert isinstance(data, list)
            assert len(data) == 9
            assert len(data[0]) == 3


def test_get_plot(app, client):
    """Test the working of the get_plot function."""
    data_ = json.dumps(init_data())
    params = json.dumps(init_params())

    with app.test_request_context():
        url = url_for('demo.get_plot')

        # invalid data params
        resp = client.post(url, data={'data': '', 'params': params})
        assert resp.content_type == 'application/json'
        data = json.loads(resp.data)
        assert 'error' in data
        assert data['error'] == 'Invalid data'

        # empty data params
        resp = client.post(url, data={'data': json.dumps(''), 'params': params})
        assert resp.content_type == 'application/json'
        data = json.loads(resp.data)
        assert 'error' in data
        assert data['error'] == 'Invalid data'

        # invalid params
        resp = client.post(url, data={'data': data_, 'params': json.dumps({})})
        assert resp.content_type == 'application/json'
        data = json.loads(resp.data)
        assert 'error' in data
        assert 'Missing key' in data['error']

        resp = client.post(url, data={'data': data_, 'params': params})
        assert resp.content_type == 'application/json'
        data = json.loads(resp.data)
        assert 'plot' in data


def test_get_step(app, client):
    """Test a single step of the optimization."""
    pass
