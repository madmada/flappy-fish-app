import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './Menu.scss';

export const Menu = ({ startButtonAction, score, bestScore, audioDetectBreakpoint, setNewBreakPoint}) => {

  return (
    <div className={'menu'}>
      <div className={'menu__title'}>
        Menu
      </div>
      {!_.isNil(score) ? (
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
      ) : ''}
      <button onClick={() => startButtonAction()} className={'menu__button-start'}>
        Start New Game
      </button>
      {/* TODO: Best scores */}
    </div>
  );
};

Menu.propTypes = {
  startButtonAction: PropTypes.func,
  score: PropTypes.number,
  bestScore: PropTypes.number,
};
