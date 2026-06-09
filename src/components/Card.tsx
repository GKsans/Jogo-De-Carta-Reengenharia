import React from 'react';
import { Card as CardType } from '../types/game';
import { Sword, Shield, Zap, Eye, Bomb } from 'lucide-react';

interface CardProps {
  card: CardType;
  isPlayable?: boolean;
  isSelected?: boolean;
  isTarget?: boolean;
  isInCampo?: boolean;
  isAnimating?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const CardComponent: React.FC<CardProps> = ({
  card,
  isPlayable = false,
  isSelected = false,
  isTarget = false,
  isInCampo = false,
  isAnimating = false,
  onClick,
  size = 'medium'
}) => {
  const getRaridadeColor = (raridade: string) => {
    switch (raridade) {
      case 'Comum': return 'from-gray-600 to-gray-800 border-gray-500';
      case 'Raro': return 'from-blue-600 to-blue-800 border-blue-500';
      case 'Épico': return 'from-purple-600 to-purple-800 border-purple-500';
      case 'Lendário': return 'from-yellow-600 to-yellow-800 border-yellow-500';
      default: return 'from-gray-600 to-gray-800 border-gray-500';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Criatura': return <Sword className="w-4 h-4" />;
      case 'Magia': return <Zap className="w-4 h-4" />;
      case 'Armadilha': return <Bomb className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'w-20 h-28 text-xs';
      case 'large': return 'w-40 h-56 text-base';
      default: return 'w-32 h-44 text-sm';
    }
  };

  const baseClasses = `
    ${getSizeClasses()}
    bg-gradient-to-br ${getRaridadeColor(card.raridade)}
    border-2 rounded-xl shadow-lg
    cursor-pointer transition-all duration-300
    relative overflow-hidden
    flex flex-col
  `;

  const stateClasses = `
    ${isPlayable ? 'hover:scale-105 hover:shadow-xl glow-effect' : ''}
    ${isSelected ? 'ring-4 ring-yellow-400 scale-105 brightness-110' : ''}
    ${isTarget ? 'ring-4 ring-red-400 pulse-effect' : ''}
    ${!isPlayable && !isInCampo ? 'opacity-75' : ''}
    ${isAnimating ? 'attack-animation' : ''}
    ${card.jaAtacou && isInCampo ? 'opacity-60 saturate-50' : ''}
  `;

  return (
    <div 
      className={`${baseClasses} ${stateClasses}`}
      onClick={onClick}
    >
      {/* Custo de Mana */}
      <div className="absolute top-1 left-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs border border-blue-400">
        {card.custo}
      </div>

      {/* Tipo da Carta */}
      <div className="absolute top-1 right-1 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white">
        {getTipoIcon(card.tipo)}
      </div>

      {/* Indicador de já atacou */}
      {card.jaAtacou && isInCampo && (
        <div className="absolute top-8 right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      )}

      {/* Nome da Carta */}
      <div className="p-2 text-center">
        <h3 className="font-bold text-white leading-tight">{card.nome}</h3>
      </div>

      {/* Imagem/Ilustração (placeholder) */}
      <div className="flex-1 mx-2 mb-2 bg-black bg-opacity-30 rounded border border-white border-opacity-20 flex items-center justify-center">
        <div className="text-white text-opacity-70 text-xs text-center p-1">
          {card.descricao}
        </div>
      </div>

      {/* Stats de Ataque e Defesa */}
      {card.tipo === 'Criatura' && (
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-1 bg-red-600 rounded px-2 py-1">
            <Sword className="w-3 h-3 text-white" />
            <span className="text-white font-bold text-xs">{card.ataque}</span>
          </div>
          <div className="flex items-center gap-1 bg-blue-600 rounded px-2 py-1">
            <Shield className="w-3 h-3 text-white" />
            <span className="text-white font-bold text-xs">
              {card.defesaAtual}/{card.defesa}
            </span>
          </div>
        </div>
      )}

      {/* Efeito especial para magias e armadilhas */}
      {(card.tipo === 'Magia' || card.tipo === 'Armadilha') && (
        <div className="flex justify-center items-center p-2">
          <div className="flex items-center gap-2 bg-purple-600 rounded px-3 py-1">
            <span className="text-white font-bold text-xs">
              {card.ataque > 0 && `Dano: ${card.ataque}`}
              {card.defesa > 0 && `Cura: ${card.defesa}`}
            </span>
          </div>
        </div>
      )}

      {/* Efeito de brilho para carta selecionada */}
      {isSelected && (
        <div className="absolute inset-0 bg-yellow-400 bg-opacity-20 rounded-xl animate-pulse"></div>
      )}
    </div>
  );
};

export default CardComponent;