import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { PlayerNameModal } from '../PlayerNameModal';

import './Menu.scss';

export const Menu = ({ startButtonAction, score, bestScore, playerName, setPlayerName }) => {
  const [scoresVisible, setScoresVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(!playerName);

  const toggleHighScores = () => {
    // TODO: GET scores from API
    setScoresVisible(!scoresVisible);
  };

  const renderHighScores = () => (
    // TODO
    <div className={'menu__scores'}>
      <div className={'menu__scores-username'}>
        MAD
      </div>
      <div className={'menu__scores-score'}>
        123
      </div>

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
