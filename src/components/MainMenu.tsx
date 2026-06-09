import React from 'react';
import { Sword, Bot, Trophy, Zap } from 'lucide-react';

interface MainMenuProps {
  onStartGame: (dificuldade: 'facil' | 'medio' | 'dificil') => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Título Principal */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Sword className="w-16 h-16 text-yellow-400" />
            <Trophy className="w-20 h-20 text-gold-400" />
            <Sword className="w-16 h-16 text-yellow-400 scale-x-[-1]" />
          </div>
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4">
            BATALHA DE CARTAS
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Entre no mundo épico das batalhas de cartas! Escolha sua estratégia, invoque criaturas poderosas 
            e derrote seus oponentes em combates emocionantes.
          </p>
        </div>

        {/* Seleção de Dificuldade */}
        <div className="bg-black bg-opacity-30 rounded-2xl p-8 backdrop-blur-sm border border-white border-opacity-20">
          <h2 className="text-3xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
            <Bot className="w-8 h-8 text-blue-400" />
            Escolha a Dificuldade
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Fácil */}
            <div 
              onClick={() => onStartGame('facil')}
              className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl cursor-pointer 
                         transform transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                         border-2 border-green-500 hover:border-green-400 group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 
                              group-hover:animate-pulse">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">FÁCIL</h3>
                <p className="text-green-100 leading-relaxed">
                  Perfeito para iniciantes. O bot joga de forma aleatória e comete muitos erros estratégicos.
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-white' : 'bg-white bg-opacity-30'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Médio */}
            <div 
              onClick={() => onStartGame('medio')}
              className="bg-gradient-to-br from-yellow-600 to-orange-700 p-6 rounded-xl cursor-pointer 
                         transform transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                         border-2 border-yellow-500 hover:border-yellow-400 group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 
                              group-hover:animate-pulse">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">MÉDIO</h3>
                <p className="text-yellow-100 leading-relaxed">
                  Desafio equilibrado. O bot usa estratégias inteligentes e planeja suas jogadas com cuidado.
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${i <= 2 ? 'bg-white' : 'bg-white bg-opacity-30'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Difícil */}
            <div 
              onClick={() => onStartGame('dificil')}
              className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-xl cursor-pointer 
                         transform transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                         border-2 border-red-500 hover:border-red-400 group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 
                              group-hover:animate-pulse">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">DIFÍCIL</h3>
                <p className="text-red-100 leading-relaxed">
                  Apenas para mestres! O bot usa estratégias avançadas, analisa o campo e raramente erra.
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-3 h-3 rounded-full bg-white" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informações do Jogo */}
        <div className="mt-8 bg-black bg-opacity-20 rounded-xl p-6 border border-white border-opacity-10">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Como Jogar</h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="font-bold text-white mb-2">⚔️ Regras Básicas</h4>
              <ul className="space-y-1 text-sm">
                <li>• Comece com 4 cartas e 30 de vida</li>
                <li>• Ganhe 1 mana e 1 carta por turno</li>
                <li>• Use mana para jogar cartas</li>
                <li>• Reduza a vida do oponente a 0</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">🛡️ Estratégia</h4>
              <ul className="space-y-1 text-sm">
                <li>• Não pode atacar vida se houver cartas em campo</li>
                <li>• Cartas têm ataque e defesa</li>
                <li>• 50 cartas únicas com diferentes raridades</li>
                <li>• Planeje suas jogadas com sabedoria</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;