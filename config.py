"""SVM_Loss Config file.

Implements the configuration related objects.
:license: Apache 2.0, see LICENSE for more details.
"""
import os
from dotenv import load_dotenv

project_dir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(project_dir, '.env'))


class Config(object):
    """Loads configuration values from the environment
    or uses development values."""

    DEBUG = False
    TESTING = False

    SECRET_KEY = os.environ.get('SECRET_KEY') or 'development secret'

    SITE_NAME = 'SVM Loss'


class DevelopmentConfig(Config):
    """Development configuration overrides."""
    DEBUG = True


class TestingConfig(Config):
    """Testing configuration overrides."""
    TESTING = True
    SERVER_NAME = '127.0.0.1.xip.io:5000'


class ProductionConfig(Config):
    """Production configuration overrides."""
    pass


config_list = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig
}
