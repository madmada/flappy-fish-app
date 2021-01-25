import datetime
import os

from flask import Flask, json, Response
from flask import abort
from flask import request
from flask_cors import CORS, cross_origin

from flappy.result import Result
from . import db


def create_app():
    app = Flask(__name__, instance_relative_config=True)

    CORS(app)

    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flappy.sqlite'),
    )

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/results', methods=['GET', 'POST'])
    @cross_origin()
    def results():
        if request.method == 'POST':
            request_body = request.get_json()
            return insert_result(request_body)
        elif request.method == 'GET':
            params = request.args.to_dict()
            return get_results(params)
        else:
            abort(405)

    db.init_app(app)

    return app


def insert_result(body):
    x = datetime.datetime.now()
    print(x, ' - POST - Inserting new result = ', body)

    if 'username' in body and 'score' in body and 'resultDate' in body:
        result = (body['username'], body['score'], body['resultDate'])
        inserted_result = db.insert_result(result)
        data = json.dumps(obj=({'response': "POST - inserted result id = " + str(inserted_result)}))
        return make_response(data)
    else:
        data = json.dumps(obj=({'response': "POST - given body doesn't have required data."}))
        return make_response(data)


def get_results(params):
    if 'sort' in params or 'top' in params or 'username' in params:
        return get_specified_results(params)
    else:
        return get_all_results()


def get_specified_results(params):
    x = datetime.datetime.now()
    print(x, ' - GET - Getting specified results with params = ', params)
    results = db.get_specified_results(params)
    json_data = convert_results_to_json(results)
    return make_response(json_data)


def get_all_results():
    x = datetime.datetime.now()
    print(x, ' - GET - Getting all results')
    all_results = db.get_all_results()
    json_data = convert_results_to_json(all_results)
    return make_response(json_data)


def convert_results_to_json(results):
    res = [Result(r['username'], r['score'], r['result_date']) for r in results]
    json_data = json.dumps([ob.__dict__ for ob in res])
    return json_data


def make_response(data):
    response = Response()
    response.headers.add('Content-Type', 'application/json')
    response.data = data
    return response
