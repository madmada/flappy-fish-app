import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))


@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)


def insert_result(result):
    conn = get_db()
    sql = ''' INSERT INTO results(username,score,result_date)
                  VALUES(?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, result)
    conn.commit()
    return cur.lastrowid


def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


def get_all_results():
    sql = 'SELECT * FROM RESULTS'
    return query_db(sql)


def get_specified_results(params):
    sort_order = 'DESC'
    if 'sort' in params and params['sort'].casefold() == 'ASC'.casefold():
        sort_order = 'ASC'

    top = 15
    if 'top' in params:
        top = params['top']

    sql = """SELECT * FROM results
                    WHERE 1=1
                    ORDER BY score {sort_order}, result_date
                    LIMIT {top}
            """.format(sort_order=sort_order, top=top)
    if 'username' in params:
        username = params['username']
        sql = """SELECT * FROM results
                WHERE 1=1
                AND username = '{username}'
                ORDER BY score {sort_order}, result_date
                LIMIT {top}
        """.format(username=username, sort_order=sort_order, top=top)

    return query_db(sql)
