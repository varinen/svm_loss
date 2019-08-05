"""Routes for the Demo package."""

from flask import render_template, jsonify, request

from app.demo import bp
from app.demo.utils import get_urls, init_params as init_param_func, init_data


@bp.route('/', methods=['GET'])
@bp.route('/index', methods=['GET'])
def index():
    """Serve the main route for the application."""
    urls = get_urls()
    return render_template('index.html', title='Welcome', urls=urls)


@bp.route('/init_params', methods=['GET'])
def init_params() -> str:
    """Return a json string with the initial parameters"""
    return jsonify(init_param_func())


@bp.route('/random_params', methods=['GET'])
def random_params() -> str:
    """Return a json string with random parameters."""
    return jsonify(init_param_func(True))


@bp.route('/get_data', methods=['GET'])
def get_data() -> str:
    """Return a json string with training data to be classified."""
    rand = bool(request.args.get('rand'))
    return jsonify(init_data(rand))
