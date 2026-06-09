import React, { useState, useEffect } from 'react';
import { GameState } from '../types/game';
import { passarTurno, executarAtaque, jogarCarta, podeAtacarVida, podeAtacar } from '../utils/gameLogic';
import { executarJogadaBot } from '../utils/botAI';
import CardComponent from './Card';
import { Heart, Zap, Crown, RotateCcw, Home } from 'lucide-react';

interface GameBoardProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  onBackToMenu: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, onGameStateChange, onBackToMenu }) => {
  const [cartaSelecionada, setCartaSelecionada] = useState<number | null>(null);
  const [modoAtaque, setModoAtaque] = useState(false);
  const [animacaoAtaque, setAnimacaoAtaque] = useState<string | null>(null);

  // Turno do bot
  useEffect(() => {
    if (gameState.turnoAtual === 'bot' && gameState.fase === 'jogo') {
      const timer = setTimeout(() => {
        const novoEstado = executarJogadaBot(gameState);
        onGameStateChange(novoEstado);
        
        // Passar turno após as ações do bot
        setTimeout(() => {
          onGameStateChange(passarTurno(novoEstado));
        }, 1500);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [gameState, onGameStateChange]);

  const handleJogarCarta = (cardId: number) => {
    const carta = gameState.jogador.maoCartas.find(c => c.id === cardId);
    if (!carta || gameState.jogador.mana < carta.custo || gameState.turnoAtual !== 'jogador') {
      return;
    }

    const novoEstado = jogarCarta(gameState, carta);
    onGameStateChange(novoEstado);
    setCartaSelecionada(null);
  };

  const handleSelecionarCarta = (cardId: number) => {
    if (gameState.turnoAtual !== 'jogador') return;
    
    const cartaEmCampo = gameState.jogador.cartasCampo.find(c => c.id === cardId);
    if (cartaEmCampo && !modoAtaque && podeAtacar(cartaEmCampo)) {
      setModoAtaque(true);
      setCartaSelecionada(cardId);
    }
  };

  const handleAtacar = (alvo: 'vida' | number) => {
    if (!cartaSelecionada || gameState.turnoAtual !== 'jogador') return;

    const cartaAtacante = gameState.jogador.cartasCampo.find(c => c.id === cartaSelecionada);
    if (!cartaAtacante || !podeAtacar(cartaAtacante)) return;

    let alvoFinal: any = alvo;
    if (alvo !== 'vida') {
      const cartaAlvo = gameState.bot.cartasCampo.find(c => c.id === alvo);
      if (!cartaAlvo) return;
      alvoFinal = cartaAlvo;
    } else {
      if (!podeAtacarVida(gameState.jogador, gameState.bot)) return;
    }

    // Animação de ataque
    setAnimacaoAtaque(`${cartaSelecionada}-${alvo}`);
    
    setTimeout(() => {
      const novoEstado = executarAtaque(gameState, cartaAtacante, alvoFinal);
      onGameStateChange(novoEstado);
      setCartaSelecionada(null);
      setModoAtaque(false);
      setAnimacaoAtaque(null);
    }, 800);
  };

  const handlePassarTurno = () => {
    if (gameState.turnoAtual !== 'jogador') return;
    
    const novoEstado = passarTurno(gameState);
    onGameStateChange(novoEstado);
    setCartaSelecionada(null);
    setModoAtaque(false);
  };

  const cancelarAcao = () => {
    setCartaSelecionada(null);
    setModoAtaque(false);
  };

  if (gameState.fase === 'fim') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-black bg-opacity-50 p-8 rounded-2xl text-center max-w-md w-full mx-4">
          <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">
            {gameState.vencedor === 'Jogador' ? 'Vitória!' : 'Derrota!'}
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            {gameState.vencedor} venceu a batalha!
          </p>
          <button
            onClick={onBackToMenu}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                     text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Voltar ao Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Header com informações dos jogadores */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onBackToMenu}
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
        >
          <Home className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-8">
          {/* Info do Bot */}
          <div className="bg-red-900 bg-opacity-50 p-3 rounded-lg border border-red-500">
            <div className="flex items-center gap-2 text-white">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="font-bold">{gameState.bot.vida}</span>
              <Zap className="w-5 h-5 text-blue-400 ml-2" />
              <span className="font-bold">{gameState.bot.mana}/{gameState.bot.manaMaxima}</span>
            </div>
            <p className="text-sm text-gray-300">Bot ({gameState.dificuldade})</p>
          </div>
          
          {/* Turno Atual */}
          <div className="text-center">
            <div className="text-white font-bold text-lg">
              Turno {gameState.turnoNumero}
            </div>
            <div className={`text-sm font-bold ${
              gameState.turnoAtual === 'jogador' ? 'text-green-400' : 'text-red-400'
            }`}>
              {gameState.turnoAtual === 'jogador' ? 'Seu Turno' : 'Turno do Bot'}
            </div>
          </div>
          
          {/* Info do Jogador */}
          <div className="bg-green-900 bg-opacity-50 p-3 rounded-lg border border-green-500">
            <div className="flex items-center gap-2 text-white">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="font-bold">{gameState.jogador.vida}</span>
              <Zap className="w-5 h-5 text-blue-400 ml-2" />
              <span className="font-bold">{gameState.jogador.mana}/{gameState.jogador.manaMaxima}</span>
            </div>
            <p className="text-sm text-gray-300">Jogador</p>
          </div>
        </div>
      </div>

      {/* Campo do Bot */}
      <div className="mb-6">
        <div className="bg-red-900 bg-opacity-30 rounded-lg p-4 border border-red-500">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2">
            Campo do Bot
            {gameState.bot.cartasCampo.length === 0 && modoAtaque && (
              <span className="text-sm text-yellow-400">(Pode atacar vida diretamente!)</span>
            )}
          </h3>
          <div className="flex gap-3 min-h-48">
            {gameState.bot.cartasCampo.length === 0 ? (
              <div 
                className={`flex-1 border-2 border-dashed border-red-400 rounded-lg flex items-center justify-center text-red-300 cursor-pointer
                  ${modoAtaque ? 'hover:bg-red-500 hover:bg-opacity-20 border-solid' : ''}`}
                onClick={() => modoAtaque && handleAtacar('vida')}
              >
                {modoAtaque ? 'Atacar Vida (0 defesas)' : 'Campo Vazio'}
              </div>
            ) : (
              gameState.bot.cartasCampo.map(carta => (
                <CardComponent
                  key={carta.id}
                  card={carta}
                  isInCampo={true}
                  isTarget={modoAtaque}
                  isAnimating={animacaoAtaque?.includes(carta.id.toString())}
                  onClick={() => modoAtaque && handleAtacar(carta.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Campo do Jogador */}
      <div className="mb-6">
        <div className="bg-green-900 bg-opacity-30 rounded-lg p-4 border border-green-500">
          <h3 className="text-white font-bold mb-2">Seu Campo</h3>
          <div className="flex gap-3 min-h-48">
            {gameState.jogador.cartasCampo.length === 0 ? (
              <div className="flex-1 border-2 border-dashed border-green-400 rounded-lg flex items-center justify-center text-green-300">
                Campo Vazio
              </div>
            ) : (
              gameState.jogador.cartasCampo.map(carta => (
                <CardComponent
                  key={carta.id}
                  card={carta}
                  isInCampo={true}
                  isSelected={cartaSelecionada === carta.id}
                  isPlayable={podeAtacar(carta) && gameState.turnoAtual === 'jogador'}
                  isAnimating={animacaoAtaque?.startsWith(carta.id.toString())}
                  onClick={() => handleSelecionarCarta(carta.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mão do Jogador */}
      <div className="bg-blue-900 bg-opacity-30 rounded-lg p-4 border border-blue-500">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-bold">Sua Mão</h3>
          <div className="flex gap-2">
            {modoAtaque && (
              <button
                onClick={cancelarAcao}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors text-sm"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handlePassarTurno}
              disabled={gameState.turnoAtual !== 'jogador'}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed 
                       text-white font-bold px-4 py-2 rounded transition-colors"
            >
              Passar Turno
            </button>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {gameState.jogador.maoCartas.map(carta => (
            <CardComponent
              key={carta.id}
              card={carta}
              isPlayable={gameState.jogador.mana >= carta.custo && gameState.turnoAtual === 'jogador' && !modoAtaque}
              onClick={() => handleJogarCarta(carta.id)}
            />
          ))}
        </div>
      </div>

      {/* Instruções */}
      {modoAtaque && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold">
          Selecione um alvo para atacar!
        </div>
      )}
    </div>
  );
};

export default GameBoard;