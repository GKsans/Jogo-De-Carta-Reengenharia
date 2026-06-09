import React, { useState } from 'react';
import { GameState } from './types/game';
import { inicializarJogo } from './utils/gameLogic';
import MainMenu from './components/MainMenu';
import GameBoard from './components/GameBoard';

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleStartGame = (dificuldade: 'facil' | 'medio' | 'dificil') => {
    const novoJogo = inicializarJogo(dificuldade);
    setGameState(novoJogo);
  };

  const handleBackToMenu = () => {
    setGameState(null);
  };

  const handleGameStateChange = (newState: GameState) => {
    setGameState(newState);
  };

  return (
    <div className="app">
      {!gameState ? (
        <MainMenu onStartGame={handleStartGame} />
      ) : (
        <GameBoard 
          gameState={gameState} 
          onGameStateChange={handleGameStateChange}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App;