// CONSTANTS, SETTINGS, HELPER FUNCTIONS

export const apiUrl = 'http://localhost:8080';

export const PLAYER_RADIUS = 30;

export const getInitialPipes = () => {
  const count = 3;
  const pipes = [];
  for (let i = 1; i < count; i++) {
    const x = (window.innerWidth * 0.75) + (window.innerWidth / i);
    pipes.push({
      upperPipeHeight: (window.innerHeight / 2) - (Math.random() * 200) - 50,
      bottomPipeHeight: (window.innerHeight / 2) - (Math.random() * 200) - 50,
      x: x,
      pipeWidth: 80,
      wasCrossed: false
    });
  }
  return pipes;
};

export const initialAppState = {
  playerName: undefined,
  playerYPosition: window.innerHeight / 2,
  playerXPosition: window.innerWidth * 0.25,
  gravity: 0.8,
  velocity: 0,
  pipes: getInitialPipes(),
  pipeSpeed: 7,
  menuVisible: false,
  score: 0,
  playerBestScore: 0,
  results: [],
};
