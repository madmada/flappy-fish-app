import * as React from 'react';
import PropTypes from 'prop-types';
import fishImage from './fish.png';

import './Player.scss';

export const Player = ({
  playerLeftPosition,
  xPosition,
  size,
  velocity,
}) => {
  const MAX_PLAYER_ROTATION = 55;
  const MIN_PLAYER_ROTATION = -55;
  const rotate = velocity > 0 ? Math.min(velocity*8, MAX_PLAYER_ROTATION) : Math.max(velocity*3, MIN_PLAYER_ROTATION);

  return (
    <div className={'player'} style={{ left: playerLeftPosition, top: xPosition, transform: `rotate(${rotate}deg)`}}>
      <img className={'player__image'} src={fishImage} alt={'player'} height={size} />
    </div>
  );
};

Player.propTypes = {
  playerLeftPosition: PropTypes.number,
  xPosition: PropTypes.number,
  size: PropTypes.number,
  velocity: PropTypes.number,
};
