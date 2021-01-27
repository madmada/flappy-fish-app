CREATE TABLE IF NOT EXISTS results (
    username TEXT,
    score INTEGER,
    result_date TEXT
);

INSERT INTO results(username, score, result_date) VALUES('Champion1', 2, '2021-01-20T15:00:00.000Z');
INSERT INTO results(username, score, result_date) VALUES('Champion1', 4, '2021-01-22T15:00:00.000Z');
INSERT INTO results(username, score, result_date) VALUES('Champion2', 4, '2021-01-22T15:01:00.000Z');
INSERT INTO results(username, score, result_date) VALUES('Champion2', 4, '2021-01-24T15:00:00.000Z');
INSERT INTO results(username, score, result_date) VALUES('Champion2', 5, '2021-01-24T15:00:00.000Z');
