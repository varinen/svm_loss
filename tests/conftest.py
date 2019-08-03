"""Configure the test suite."""

import pytest
from app import create_app
from config import config_list


@pytest.fixture(scope='module')
def app():
    """Create and configure a new app instance for each test."""
    # create the app with common test config
    config = config_list['testing']

    app = create_app(config)

    yield app


@pytest.fixture(scope='function')
def client(app):
    """Create a test client for the app."""
    return app.test_client()
