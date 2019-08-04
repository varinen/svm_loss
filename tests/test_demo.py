"""Test suite for the Demo package."""

import json
from flask import url_for


def test_demo_index(app, client):
    """Test the response from the index page."""
    with app.test_request_context():
        resp = client.get(url_for('demo.index'))
        assert 'Linear Classifier Demo' in str(resp.data)


def test_init_params(app, client):
    """Test the response from the init_params route."""
    with app.test_request_context():
        resp = client.get(url_for('demo.init_params'))
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
