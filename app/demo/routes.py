"""Routes for the Demo package."""

import numpy as np
import json
from json import JSONDecodeError
from flask import render_template, jsonify, request

from app.demo import bp
from app.demo.optimizer import grad_step, adjust_params
from app.demo.utils import (
    get_urls,
    init_data,
    init_params,
    is_int
)
from app.demo.plot import (
    generate_plot_image_string
)


@bp.route('/', methods=['GET'])
@bp.route('/index', methods=['GET'])
def index():
    """Serve the main route for the application."""
    urls = get_urls()
    return render_template('index.html', title='Welcome', urls=urls)


@bp.route('/get_params', methods=['GET'])
def get_params() -> str:
    """Return a json string with init or random parameters."""
    rand = False
    if not request.args.get('rand') is None and is_int(
            request.args.get('rand')):
        rand = bool(int(request.args.get('rand')))
    return jsonify(init_params(rand))


@bp.route('/get_data', methods=['GET'])
def get_data() -> str:
    """Return a json string with training data to be classified."""
    rand = False
    if not request.args.get('rand') is None and is_int(
            request.args.get('rand')):
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

    except JSONDecodeError as ex:
        return jsonify({'error': 'Invalid data'})
    except TypeError as ex:
        return jsonify({'error': str(ex)})
    except KeyError as ex:
        return jsonify({'error': ', '.join(['Missing key: ', str(ex)])})


@bp.route('/get_step', methods=['POST'])
def get_step():
    """Perform a single optimization step."""
    try:
        data = json.loads(request.form.get('data'))
        params = json.loads(request.form.get('params'))
        loss_type = request.form.get('loss_type', 'ww')
        if not isinstance(params, dict) or not isinstance(data, list):
            raise TypeError('Invalid data')
        data = np.array(data)

        weights = params['weights']
        biases = params['biases']

        result = {}

        labels = data[:, 2].astype(int)
        params_ = np.c_[weights, biases]

        grad_w, grad_b, result['cost_loss'], result['loss'], \
            result['scores'], result['total_loss'], result['reg_loss'] = \
            grad_step(data, labels, params_, loss_type)

        learning_rate = 0.1

        weights = np.array(weights)
        biases = np.array(biases)
        biases = biases[:, np.newaxis]
        result['weights'], result['biases'] = adjust_params(weights, biases,
                                                            grad_w, grad_b,
                                                            learning_rate)
        result['grad_w'] = grad_w
        result['grad_b'] = grad_b

        plot = generate_plot_image_string(data, np.c_[
            result['weights'], result['biases']])
        result['plot'] = plot

        return jsonify(result)

    except JSONDecodeError as ex:
        return jsonify({'error': 'Invalid data'})
    except TypeError as ex:
        return jsonify({'error': str(ex)})
    except KeyError as ex:
        return jsonify({'error': ', '.join(['Missing key: ', str(ex)])})
    except ValueError as ex:
        return jsonify({'error': str(ex)})
