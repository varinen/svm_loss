"""Test suite for the Demo package."""

from flask import url_for


def test_demo_index(app, client):
    """Test the response from the index page."""
    with app.test_request_context():
        resp = client.get(url_for('demo.index'))

        assert 'Linear Classifier Demo' in str(resp.data)
