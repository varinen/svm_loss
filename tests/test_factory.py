"""Tests the app factory implementation."""

from logging.handlers import RotatingFileHandler

from app import create_app, get_operation_years
from config import Config


def test_config():
    """Create app without passing the config object."""
    assert not create_app().testing
    """Create app with passing the config object"""
    config = Config()
    config.TESTING = True
    assert create_app(config).testing


def test_ping(client):
    """Check if the application can route to a predefined view."""
    response = client.get('/ping')
    assert response.data == b'Ping!'


def test_main():
    """Test the main script."""
    from main import app
    assert not app.testing


def test_conf_loggers():
    """Check if the app is capable of creating loggers."""
    config = Config()
    config.DEBUG = False
    config.TESTING = False
    app = create_app(config)

    assert isinstance(app.logger.handlers[0], RotatingFileHandler)

    file_logger = app.logger.handlers[0]
    with open(file_logger.baseFilename, 'r') as f:
        lines = f.read().splitlines()
        last_line = lines[-1]
        assert 'INFO: SVM_Loss startup' in last_line


def test_conf_operation_years(app):
    """Test the correct generation of the operation years."""
    with app.app_context():
        app.config['START_YEAR'] = 2019
        assert '2019' == get_operation_years()

        app.config['START_YEAR'] = 2017
        assert '2017 - 2019' == get_operation_years()
