"""Routes for the Demo package."""

import numpy as np
import json
from flask import render_template, jsonify, request

from app.demo import bp
from app.demo.utils import *


@bp.route('/', methods=['GET'])
@bp.route('/index', methods=['GET'])
def index():
    """Serve the main route for the application."""
    urls = get_urls()
    return render_template('index.html', title='Welcome', urls=urls)


@bp.route('/get_params', methods=['GET'])
def get_params() -> str:
    """Return a json string with init or random parameters."""
    rand = bool(int(request.args.get('rand')))
    return jsonify(init_params(rand))


@bp.route('/get_data', methods=['GET'])
def get_data() -> str:
    """Return a json string with training data to be classified."""
    rand = bool(int(request.args.get('rand')))
    return jsonify(init_data(rand))


@bp.route('/get_plot', methods=['POST'])
def get_plot():
    """Return a base64 encoded content of the plot."""
    try:
        data = json.loads(request.form.get('data'))
        params = json.loads(request.form.get('params'))
        if not isinstance(params, dict) or not isinstance(data, list):
            raise TypeError('Invalid data')
        data = np.array(data)

        weights = params['weights']
        biases = params['biases']

        params_ = np.c_[weights, biases]

        plot = generate_plot_image_string(data, params_)
        return jsonify({'plot': plot})
    except TypeError as ex:
        return jsonify({'error': str(ex)})

    except KeyError as ex:
        return jsonify({'error': str(ex)})
