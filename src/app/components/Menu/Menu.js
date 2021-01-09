import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './Menu.scss';

export const Menu = ({ startButtonAction, score, bestScore }) => {
  const [scoresVisible, setScoresVisible] = React.useState(false);

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
        <button onClick={() => startButtonAction()} className={'menu__button-start'}>
          Start New Game
        </button>
      }
      <button onClick={() => toggleHighScores()} className={'menu__button-scores'}>
        {!scoresVisible ? 'Best scores' : 'Back to Menu'}
      </button>
    </div>
  );
};

Menu.propTypes = {
  startButtonAction: PropTypes.func,
  score: PropTypes.number,
  bestScore: PropTypes.number,
};
