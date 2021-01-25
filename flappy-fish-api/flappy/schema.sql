CREATE TABLE IF NOT EXISTS results (
    username TEXT,
    score INTEGER,
    result_date TEXT
);

INSERT INTO results(username, score, result_date) VALUES('Champion1', 2, '2020-10-10 15:00:00');
INSERT INTO results(username, score, result_date) VALUES('Champion1', 4, '2020-12-10 18:00:00');
INSERT INTO results(username, score, result_date) VALUES('Champion2', 4, '2020-10-10 15:00:00');
INSERT INTO results(username, score, result_date) VALUES('Champion2', 4, '2020-10-10 18:00:00');
INSERT INTO results(username, score, result_date) VALUES('Champion2', 5, '2020-10-10 18:00:00');