import React, { Component } from 'react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import { Pipe, Player, Menu } from './components';
import { initialAppState, getInitialPipes, PLAYER_RADIUS } from './App.helper';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialAppState;
    this.setPlayerName = this.setPlayerName.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.startRound = this.startRound.bind(this);
    this.endRound = this.endRound.bind(this);
  }

  componentDidMount() {
    this.setState({ menuVisible: true, score: null });
  }

  setPlayerName(name) {
    this.setState({
      playerName: name
    });
  }

  startRound() {
    const score = this.state.score;
    const bestScore = this.state.bestScore;

    const stateToUpdate = {
      ...initialAppState,
      bestScore: score > bestScore ? score : bestScore,
      pipes: getInitialPipes(),
    };

    this.setState(stateToUpdate);
    this.interval = setInterval(() => {
      this.update();
    }, 30);
  }

  endRound() {
    clearInterval(this.interval);
    this.setState({
      menuVisible: true,
    });
  }

  moveUp() {
    const newVelocity = this.state.velocity - 30;
    this.setState({
      velocity: newVelocity
    });
  }

  update() {
    const birdCrashed = this.state.playerYPosition > window.innerHeight - PLAYER_RADIUS * 2;
    if (birdCrashed) {
      this.endRound();
      return;
    }

    const pipeWasHit = this.state.pipes.find(pipe => pipe.isHit);
    if (pipeWasHit) {
      this.endRound();
      return;
    }

    var notCrossedPipes = this.state.pipes.filter(pipe => !pipe.wasCrossed);
    notCrossedPipes.forEach(pipe => {
      if (this.state.playerXPosition > pipe.x) {
        this.setState(prevState => ({
          score: prevState.score + 1,
          pipeSpeed: prevState.pipeSpeed * 1.04
        }));
      }
    });

    const newVelocity = (this.state.velocity + this.state.gravity) * 0.9;
    const newPlayerYPosition = newVelocity + this.state.playerYPosition;
    const newPipes = this.state.pipes.map(pipe => {
      const newX = pipe.x - this.state.pipeSpeed;
      if (newX < 0) {
        return {
          upperPipeHeight: (window.innerHeight / 2) - (Math.random() * 200) - 50,
          bottomPipeHeight: (window.innerHeight / 2) - (Math.random() * 200) - 50,
          x: window.innerWidth - 30,
          pipeWidth: 80,
          wasCrossed: false
        };
      } else {
        let isHit = false;

        const pipeMiddle = pipe.x;
        const pipeL = pipeMiddle - pipe.pipeWidth / 2;
        const pipeR = pipeMiddle + pipe.pipeWidth / 2;

        const fishMiddle = this.state.playerXPosition;
        const fishL = fishMiddle - PLAYER_RADIUS;
        const fishR = fishMiddle + PLAYER_RADIUS;

        const pipeWasCrossed = fishMiddle > pipeMiddle;

        const hitOnX = (fishR >= pipeL) && (fishL <= pipeR);

        const hitOnUpperY = (newPlayerYPosition) <= pipe.upperPipeHeight;
        const hitOnLowerY = (newPlayerYPosition + 2 * PLAYER_RADIUS) >= (window.innerHeight - pipe.bottomPipeHeight);

        if (hitOnX && (hitOnUpperY || hitOnLowerY)) {
          isHit = true;
        }

        return {
          ...pipe,
          x: newX,
          isHit: isHit,
          wasCrossed: pipeWasCrossed
        };
      }
    });

    this.setState({
      velocity: newVelocity,
      playerYPosition: newPlayerYPosition,
      pipes: newPipes
    });
  }

  render() {
    const playerLeftPosition = this.state.playerXPosition;
    const playerYPosition = this.state.playerYPosition;
    const animatedBackgroundStyle = this.state.menuVisible ? '' : 'slide 60s linear infinite';
    const scoreBoard = this.state.score;

    return (
      <div className={'App'}>
        <div className={'sliding-background'} style={{ animation: animatedBackgroundStyle }}></div>
        <div className={'window-container'}>

          {this.state.menuVisible ? (
            <>
              <KeyHandler keyEventName={KEYPRESS} keyValue={'Enter'} onKeyHandle={this.startRound} />
              <Menu
                startButtonAction={this.startRound}
                score={this.state.score}
                bestScore={this.state.bestScore}
                playerName={this.state.playerName}
                setPlayerName={this.setPlayerName}
              />
            </>
          ) : (
            <>
              <KeyHandler keyEventName={KEYPRESS} keyValue={' '} onKeyHandle={this.moveUp} />
              <div className={'score-board'}>{scoreBoard}</div>)
            </>
          )}
          <Player
            playerLeftPosition={playerLeftPosition}
            xPosition={playerYPosition}
            size={PLAYER_RADIUS * 2}
            velocity={this.state.velocity}
          />
          {this.state.pipes.map(pipe => {
            const upperPipeHeight = pipe.upperPipeHeight;
            const pipeXPosition = pipe.x;

            const bottomPipeTop = window.innerHeight - pipe.bottomPipeHeight;
            const bottomPipeHeight = pipe.bottomPipeHeight;

            return <Pipe
              key={pipeXPosition}
              isHit={pipe.isHit}
              wasCrossed={pipe.wasCrossed}
              upperPipeHeight={upperPipeHeight}
              bottomPipeHeight={bottomPipeHeight}
              xPosition={pipeXPosition}
              pipeWidth={pipe.pipeWidth}
              bottomPipeTop={bottomPipeTop}
            />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
