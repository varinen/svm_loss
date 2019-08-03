"""Routes for the Demo package."""

from flask import render_template

from app.demo import bp


@bp.route('/', methods=['GET'])
@bp.route('/index', methods=['GET'])
def index():
    """Serve the main route for the application."""
    return render_template('index.html', title='Welcome')
