# Dołączanie modułu flask
from flask import abort, Flask, g, jsonify
from flask import request
from flappy.result import Result
import datetime

import sqlite3

# Tworzenie aplikacji
app = Flask("FlappyFish - Server")

# Ścieżka do pliku bazy danych w sqlite
DATABASE = 'results.db'
SCHEMA_SQL = 'schema.sql'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


@app.teardown_appcontext
def close_connection(error):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def init_db():
    db = get_db()
    with app.open_resource(SCHEMA_SQL, mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()


@app.cli.command('init-db')
def initdb_command():
    init_db()
    print("Initialized the database.")


@app.route('/results', methods=['GET', 'POST'])
def consume_request():
    # Sprawdzenie jakiego typu przyszło zapytanie
    if request.method == 'POST':
        # sprawdź czy post request zawiera wszystkie potrzebne dane
        # jeśli zawiera wszystkie dane, utwórz obiekt i zapisz go do bazy!

        # json_body = request.get_json()
        # if json_body['username'] and json_body['score'] and json_body['resultDate']:
        #     res = Result(json_body['username'], json_body['score'], json_body['resultDate'])
        #     print(res)
        #     return jsonify(response="POST - username=" + json_body['username'] + " score=" + str(
        #         json_body['score']) + " resultDate=" + json_body['resultDate'])
        return jsonify(response="POST - There is no required params in body")

    elif request.method == 'GET':
        print("Przyszedł GET...")
        params = request.args
        if params.get('sort') or params.get('top') or params.get('username'):
            # sort, top, username
            # wykonaj parametryzowane pobranie wyników
            return jsonify(response="GET - Parametry: sort=" + params.get('sort') + " top=" + params.get(
                'top') + " username=" + params.get('username'))
        else:
            # wykonaj pobranie wszystkich wyników
            results = []
            for i in (1, 10):
                results.append(Result("username" + str(i), i * i, datetime))

            # users = get_all_users()
            # return jsonify([user.to_json() for user in users])
            return jsonify(response="GET - Pobranie wszystkich dostępnych wyników")
    else:
        abort(405)


# init - create or replace table results(id, username, score, resultsdate)
# conn = sqlite3.connect(DATABASE)
# c = conn.cursor()
# c.execute('aaaaaaa')
# conn.commit()
# conn.close()
# c.execute('select rowid, username, score, resultDate from results')
# a = c.fetchall()
# print a
# for i in a:
# print i[0], i[1], i[2], i[3]

# Uruchomienie applikacji w trybie debug
# app.debug = True
app.run()
