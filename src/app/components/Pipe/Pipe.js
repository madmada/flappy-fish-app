import React from 'react';
import { Rectangle } from 'react-shapes';
import PropTypes from 'prop-types';

export const Pipe = ({
  xPosition,
  pipeWidth,
  upperPipeHeight,
  bottomPipeTop,
  bottomPipeHeight,
  isHit,
}) => {
  const linearGradientRed = 'linear-gradient(90deg, rgba(65,4,4,1) 0%, rgba(255,86,49,1) 41%, rgba(65,4,4,1) 100%)';
  const linearGradientRedGreen = 'linear-gradient(90deg, rgba(16,54,3,1) 0%, rgba(114,219,88,1) 41%, rgba(16,54,3,1) 100%)';
  const color = isHit ? linearGradientRed : linearGradientRedGreen;

  return (
    <div id='pipe'>
      <div style={{
        left: xPosition,
        top: 0,
        position: 'absolute',
        backgroundImage: color,
      }}>
        <Rectangle width={pipeWidth} height={upperPipeHeight} fill={{ color: 'transparent' }} fillOpacity={0} />
      </div>
      <div style={{
        left: xPosition,
        top: bottomPipeTop,
        position: 'absolute',
        backgroundImage: color,
      }}>
        <Rectangle width={pipeWidth} height={bottomPipeHeight} fill={{ color: 'transparent' }} />
      </div>
    </div>
  );
};

Pipe.propTypes = {
  xPosition: PropTypes.number,
  pipeWidth: PropTypes.number,
  upperPipeHeight: PropTypes.number,
  bottomPipeTop: PropTypes.number,
  bottomPipeHeight: PropTypes.number,
  isHit: PropTypes.bool,
};
