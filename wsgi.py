"""SVM_Loss wsgi script.

Implements the wsgi entry point.
:copyright: © 2019 by the Divisionlab.
:license: Apache 2.0, see LICENSE for more details.
"""
from app import create_app

if __name__ == "__main__":
    app = create_app()
    app.run()