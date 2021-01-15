import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { PlayerNameModal } from '../PlayerNameModal';

import './Menu.scss';

export const Menu = ({ startButtonAction, score, bestScore, playerName, setPlayerName }) => {
  const [scoresVisible, setScoresVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(!playerName);

  const toggleHighScores = () => {
    // TODO: GET scores from API
    setScoresVisible(!scoresVisible);
  };

  // @ts-ignore
  // eslint-disable-next-line quotes
  const mockedResults = [{ "username": "champion", "score": 797, "resultDate": "2021-01-15T17:31:50.425537Z" }, { "username": "user1", "score": 748, "resultDate": "2021-01-15T17:31:50.287728Z" }, { "username": "user9", "score": 654, "resultDate": "2021-01-15T17:31:50.420791Z" }, { "username": "champion", "score": 619, "resultDate": "2021-01-15T17:31:50.415740Z" }, { "username": "user7", "score": 590, "resultDate": "2021-01-15T17:31:50.410727Z" }, { "username": "user5", "score": 471, "resultDate": "2021-01-15T17:31:50.401637Z" }, { "username": "champion", "score": 466, "resultDate": "2021-01-15T17:31:50.397167Z" }, { "username": "champion", "score": 163, "resultDate": "2021-01-15T17:31:50.406428Z" }, { "username": "champion", "score": 53, "resultDate": "2021-01-15T17:31:50.387842Z" }, { "username": "user3", "score": 30, "resultDate": "2021-01-15T17:31:50.392621Z" }];

  const renderHighScores = () => (
    <div className={'menu__scores'}>
      {mockedResults.map((result, index) => {
        const isMyResult = playerName === result.username;

        return (
          <div
            className={classNames('menu__scores-item', {
              'menu__scores-item--green': isMyResult
            })}
            key={`result-${index}`}
          >
            <div className={'menu__scores-username'}>
              {result.username}
            </div>
            <div className={'menu__scores-score'}>
              {result.score}
            </div>
          </div>
        );
      }
      )}
    </div>
  );

  const renderYourScore = () => (
    !_.isNil(score) && (
      <>
        {score > bestScore &&
          <div className={'menu__new-record'}>
            New Record !!!
          </div>
        }
        <div className={'menu__score'}>
          {`Your score is:  ${score}`}
        </div>
        {/* TODO: adjust when storing scores in db */}
        <div className={'menu__best'}>
          BEST: {bestScore || score}
        </div>
      </>
    )
  );

  return (
    <div className={'menu'}>
      <div className={'menu__title'}>
        {!scoresVisible ? 'Menu' : 'High scores'}
      </div>

      {scoresVisible ?
        renderHighScores()
        : renderYourScore()
      }

      {!scoresVisible &&
        <button
          onClick={() => startButtonAction()}
          className={'menu__button menu__button--green'}
          disabled={modalVisible}
        >
          Start New Game
        </button>
      }
      <button
        onClick={() => toggleHighScores()}
        className={'menu__button'}
        disabled={modalVisible}
      >
        {!scoresVisible ? 'Best scores' : 'Back to Menu'}
      </button>

      {!scoresVisible &&
        <button
          onClick={() => setModalVisible(true)}
          className={'menu__button'}
          disabled={modalVisible}
        >
          Change player name
        </button>
      }

      {modalVisible && (
        <PlayerNameModal playerName={playerName} setModalVisible={setModalVisible} setPlayerName={setPlayerName} />
      )}
    </div >
  );
};

Menu.propTypes = {
  startButtonAction: PropTypes.func.isRequired,
  setPlayerName: PropTypes.func.isRequired,
  score: PropTypes.number,
  bestScore: PropTypes.number,
  playerName: PropTypes.string,
};
