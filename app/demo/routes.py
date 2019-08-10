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


@bp.route('/get_params', methods=['GET'])
def get_params() -> str:
    """Return a json string with init or random parameters."""
    rand = bool(request.args.get('rand'))
    return jsonify(init_param_func(rand))


@bp.route('/get_data', methods=['GET'])
def get_data() -> str:
    """Return a json string with training data to be classified."""
    rand = bool(request.args.get('rand'))
    return jsonify(init_data(rand))
