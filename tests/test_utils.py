"""Tests for the utils module."""

from app.demo.utils import get_urls, init_params


def test_get_urls(app):
    """Test the get_urls function."""
    with app.app_context():
        result = get_urls()
        assert isinstance(result, dict)
        assert len(result) > 0
        assert result['init_prams_url']
        assert 'init_params' in result['init_prams_url']


def test_init_params(app):
    """Test the init_params function"""
    with app.app_context():
        result = init_params()

        assert isinstance(result, dict)
        assert result['weights']
        assert result['biases']
        assert len(result['weights']) == 3
        assert len(result['weights'][0]) == 2
        assert len(result['weights'][1]) == 2
        assert len(result['biases']) == 3
