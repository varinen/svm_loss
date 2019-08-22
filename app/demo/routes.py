"""Routes for the Demo package."""

import numpy as np
from numpy import ndarray
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
    return render_template('index.html', urls=urls)


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
        hyper = json.loads(request.form.get('hyper'))

        if not isinstance(params, dict) or not isinstance(data, list):
            raise TypeError('Invalid data')
        data = np.array(data)

        weights = params['weights']
        biases = params['biases']
        labels = data[:, 2].astype(int)
        params_ = np.c_[weights, biases]

        result = dict()

        result['grad_w'], result['grad_b'], result['cost_loss'], \
            result['loss'], result['scores'], result['total_loss'], \
            result['reg_loss'] = grad_step(data, labels, params_,
                                           hyper['loss_type'], hyper['reg_c'])

        weights = np.array(weights)
        biases = np.array(biases)
        if biases.shape == (3,):
            biases = biases[:, np.newaxis]

        result['weights'], result['biases'] = \
            adjust_params(weights, biases, result['grad_w'], result['grad_b'],
                          hyper['learning_rate'])

        # Convert ndarrays to lists before jsonifying
        lists = {key: result[key].tolist() for key in result if
                 isinstance(result[key], ndarray)}
        for key in result:
            if key in lists:
                result[key] = lists[key]

        plot = generate_plot_image_string(data, np.c_[
            result['weights'], result['biases']])
        result['plot'] = plot

        result['mean_loss'] = np.mean(result['loss'])

        return jsonify(result)

    except JSONDecodeError as ex:
        return jsonify({'error': 'Invalid data'})
    except TypeError as ex:
        return jsonify({'error': str(ex)})
    except KeyError as ex:
        return jsonify({'error': ', '.join(['Missing key: ', str(ex)])})
    except ValueError as ex:
        return jsonify({'error': str(ex)})
