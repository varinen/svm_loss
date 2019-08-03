"""Handlers for errors."""
from flask import Blueprint
from flask import render_template

bp = Blueprint('errors', __name__)


@bp.app_errorhandler(404)
def not_found_error(error):
    """Render a 404 template."""
    template = 'errors/404.html'
    return render_template(template), 404


@bp.app_errorhandler(500)
def internal_error(error):
    """Render a 500 template."""
    template = 'errors/500.html'
    return render_template(template), 500
