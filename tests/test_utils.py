"""Tests for the utils module."""

from app.demo.utils import (
    init_params,
    get_urls,
    is_int,
    init_data
)


def test_is_int():
    """Test if the is_digit function can convert to int."""
    assert not is_int(None)
    assert is_int(4)
    assert is_int('4')
    assert not is_int('')
    assert is_int(4.2)


def test_get_urls(app):
    """Test the get_urls function."""
    with app.app_context():
        result = get_urls()
        assert isinstance(result, dict)
        assert len(result) > 3
        assert result['get_params_url']
        assert 'get_params' in result['get_params_url']
        assert result['get_data_url']
        assert 'get_data' in result['get_data_url']
        assert result['get_step_url']
        assert 'get_step' in result['get_step_url']
        assert result['get_plot_url']
        assert 'get_plot' in result['get_plot_url']


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


def test_init_data():
    """Test the data generation by the init_data function."""
    rands = [True, False]

    for rand in rands:
        result = init_data(rand)

        assert isinstance(result, list)
        assert len(result) == 9
        for i in result:
            assert len(i) == 3
