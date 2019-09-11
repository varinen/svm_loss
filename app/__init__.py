"""SVM_Loss: Linear Classifier and Loss function demo.

A web application to demonstrate back-prop based optimization of
a linear classifier

:license: Apache 2, see LICENSE for more details.
"""

import os
from datetime import datetime
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask, abort, current_app
from flask_bootstrap import Bootstrap

from config import config_list

__version__ = "0.1.dev"

bootstrap = Bootstrap()

env_ = os.environ.get('SVM_LOSS_CONF', 'development')

if env_ in config_list:
    config_val = config_list[env_]
else:
    raise EnvironmentError('Cannot find environment config')


def get_operation_years() -> str:
    """Return a string representing the operation years of the website."""
    start_year = int(current_app.config['START_YEAR'])
    current_year = int(datetime.now().year)
    if start_year == current_year:
        return str(start_year)
    else:
        return ' - '.join([str(start_year), str(current_year)])


def create_app(config_class: object = config_val):
    """Create and configure the instance of the application."""
    app = Flask(__name__)
    app.config.from_object(config_class)

    bootstrap.init_app(app)

    from app.demo import bp as demo_bp
    app.register_blueprint(demo_bp)

    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    # Set up the logger to work only in production
    if not app.debug and not app.testing:
        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/svm_loss.log',
                                           maxBytes=10240, backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s '
            '[in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('SVM_Loss startup')

    @app.context_processor
    def inject_global_vars():
        """Inject global variables to be used, e.g., in Jinja templates."""
        return dict(
            site_name=app.config['SITE_NAME'],
            operation_years=get_operation_years(),
            app_config=app.config)

    @app.route('/ping')
    def ping():
        """Render a simple ping message."""
        return 'Ping!'

    @app.route('/err500')
    def err500():
        """Simulate a 500 error."""
        abort(500)

    return app
