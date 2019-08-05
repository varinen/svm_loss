"""Tests for the utils module."""

from app.demo.utils import get_urls, init_params, init_data


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


def test_init_data(app):
    """Test the data generation by the init_data function."""
    rands = [True, False]

    for rand in rands:
        result = init_data(rand)

        assert isinstance(result, list)
        assert len(result) == 9
        for i in result:
            assert len(i) == 3
