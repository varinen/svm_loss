"""Routes for the Demo package."""
from builtins import isinstance

import numpy as np
from numpy import ndarray
import json
from json import JSONDecodeError
from flask import render_template, jsonify, request, send_from_directory, \
    make_response, redirect
from flask_cors import cross_origin

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

from config import client_dir

@bp.route('/flask', methods=['GET'])
def flask():
    """Serve the main route for the application."""
    urls = get_urls()
    return render_template('index.html', urls=urls)


@bp.route('/', methods=['GET'])
@bp.route('/index', methods=['GET'])
def index():
    """Serve the main route for the application."""
    #urls = get_urls()
    #return render_template('index.html', urls=urls)
    return redirect('/client/', 301)


@bp.route('/client', methods=['GET'])
def clientNoSlash():
    return redirect('/client/', 301)

@bp.route('/client/', methods=['GET'])
def client():
    """Serve the client React app."""
    return send_from_directory(client_dir, 'index.html')


@bp.route('/client/<path:path>', methods=['GET'])
def client_path(path):
    """Serve the client React app."""
    return send_from_directory(client_dir, path)


@bp.route('/get_params', methods=['GET'])
@cross_origin()
def get_params() -> str:
    """Return a json string with init or random parameters."""
    rand = False
    if not request.args.get('rand') is None and is_int(
            request.args.get('rand')):
        rand = bool(int(request.args.get('rand')))
    resp = make_response(jsonify(init_params(rand)), 200)
    return resp


@bp.route('/get_data', methods=['GET'])
@cross_origin()
def get_data() -> str:
    """Return a json string with training data to be classified."""
    rand = False
    if not request.args.get('rand') is None and is_int(
            request.args.get('rand')):
        rand = bool(int(request.args.get('rand')))

    resp = make_response(jsonify(init_data(rand)), 200)
    return resp


@bp.route('/get_plot', methods=['POST', 'OPTIONS'])
@cross_origin()
def get_plot():
    """Return a base64 encoded content of the plot."""
    try:
        if request.is_json:
            data = request.json.get('data')
            params = request.json.get('params')
        else:
            data = json.loads(request.form.get('data'))
            params = json.loads(request.form.get('params'))
        if not isinstance(params, dict) or not isinstance(data, list):
            raise TypeError('Invalid data')
        data = np.array(data)

        weights = params['weights']
        biases = params['biases']

        params_ = np.c_[weights, biases]

        plot = generate_plot_image_string(data, params_)
        resp = make_response(jsonify({'plot': plot}), 200)
    except JSONDecodeError as ex:
        resp = make_response(
            jsonify({'error': ', '.join(['Invalid data: ', str(ex)])}), 500)
    except TypeError as ex:
        resp = make_response(jsonify({'error': str(ex)}), 500)
    except KeyError as ex:
        resp = make_response(
            jsonify({'error': ', '.join(['Missing key: ', str(ex)])}), 500)
    return resp


@bp.route('/get_step', methods=['POST'])
def get_step():
    """Perform a single optimization step."""
    try:
        if request.is_json:
            data = request.json.get('data')
            params = request.json.get('params')
            hyper = request.json.get('hyper')
        else:
            data = json.loads(request.form.get('data'))
            params = json.loads(request.form.get('params'))
            hyper = json.loads(request.form.get('hyper'))

        if not isinstance(params, dict) or not isinstance(data, list) \
                or not isinstance(hyper, dict):
            raise TypeError('Invalid data')
        data = np.array(data)

        weights = params['weights']
        biases = params['biases']
        labels = data[:, -1].astype(int)
        params_ = np.c_[weights, biases]

        result = dict()

        result['grad_w'], result['grad_b'], result['cost_loss'], \
        result['loss'], result['scores'], result['total_loss'], \
        result['reg_loss'] = grad_step(data, labels, params_,
                                       hyper['loss_type'], float(hyper['reg_c']))

        weights = np.array(weights)
        biases = np.array(biases)
        if len(biases.shape) == 1:
            biases = biases[:, np.newaxis]

        result['weights'], result['biases'] = \
            adjust_params(weights, biases, result['grad_w'], result['grad_b'],
                          hyper['learning_rate'])

        # Convert ndarrays to lists before jsonifying
        result = {key: (lambda x: x.tolist() if isinstance(x, ndarray) else x)(
            result[key]) for key in result}

        plot = generate_plot_image_string(data, np.c_[
            result['weights'], result['biases']])
        result['plot'] = plot

        result['mean_loss'] = np.mean(result['loss'])

        return jsonify(result)

    except JSONDecodeError as ex:
        return jsonify({'error': ', '.join(['Invalid data: ', str(ex)])})
    except TypeError as ex:
        return jsonify({'error': str(ex)})
    except KeyError as ex:
        return jsonify({'error': ', '.join(['Missing key: ', str(ex)])})
    except ValueError as ex:
        return jsonify({'error': str(ex)})
