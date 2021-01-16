import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { PlayerNameModal } from '../PlayerNameModal';

import './Menu.scss';

export const Menu = ({ 
  startButtonAction, 
  score, 
  results, 
  playerName, 
  setPlayerName, 
  playerBestScore,
}) => {
  const [scoresVisible, setScoresVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(!playerName);


  const toggleHighScores = () => {
    setScoresVisible(!scoresVisible);
  };

  const renderHighScores = () => (
    <div className={'menu__scores'}>
      {!_.isEmpty(results) ?
        results.map((result, index) => {
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
        ) : 'No scores found'}
    </div>
  );

  const renderYourScore = () => (
    !_.isNil(score) && (
      <>
        {score > playerBestScore &&
          <div className={'menu__new-record'}>
            Your New Record !!!
          </div>
        }
        <div className={'menu__score'}>
          {`Your score is:  ${score}`}
        </div>
        <div className={'menu__best'}>
          YOUR BEST: {playerBestScore || score}
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
        {!scoresVisible ? 'High scores' : 'Back to Menu'}
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
  results: PropTypes.arrayOf(PropTypes.object),
  playerName: PropTypes.string,
  playerBestScore: PropTypes.number,
};
