import React, { Component } from 'react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import { Pipe, Player, Menu } from './components';
import { apiUrl, initialAppState, getInitialPipes, PLAYER_RADIUS } from './App.helper';

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
    this.getResults();
  }

  getResults() {
    fetch(`${apiUrl}/results?sort=desc&top=15`)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({ results: data });
        }
      );
  }

  setPlayerName(name) {
    this.setState({
      playerName: name
    });
  }

  startRound() {
    const playerBestScoreObject = this.state.results
      .find(result => result.username === this.state.playerName);
    const playerBestScore = playerBestScoreObject ? playerBestScoreObject.score : 0;


    const stateToUpdate = {
      ...initialAppState,
      results: this.state.results,
      playerName: this.state.playerName,
      pipes: getInitialPipes(),
      playerBestScore,
    };

    this.setState(stateToUpdate);
    this.interval = setInterval(() => {
      this.update();
    }, 30);
  }

  postResult() {
    const now = new Date();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'username': this.state.playerName,
        'score': this.state.score,
        'resultDate': now.toISOString()
      })
    };
    fetch(`${apiUrl}/results`, requestOptions).then(() => this.getResults());
  }

  endRound() {
    clearInterval(this.interval);
    this.postResult();
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
              <Menu
                startButtonAction={this.startRound}
                score={this.state.score}
                results={this.state.results}
                playerName={this.state.playerName}
                setPlayerName={this.setPlayerName}
                playerBestScore={this.state.playerBestScore}
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
