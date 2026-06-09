export enum TipoCarta {
  CRIATURA = 'Criatura',
  MAGIA = 'Magia',
  ARMADILHA = 'Armadilha'
}

export enum RaridadeCarta {
  COMUM = 'Comum',
  RARO = 'Raro',
  EPICO = 'Épico',
  LENDARIO = 'Lendário'
}
export interface Card {
  id: number;
  nome: string;
  ataque: number;
  defesa: number;
  defesaAtual: number; // Nova propriedade para vida atual da carta
  custo: number;
  descricao: string;
  tipo: TipoCarta;
  raridade: RaridadeCarta;
  jaAtacou?: boolean;
}

export interface Player {
  id: string;
  nome: string;
  vida: number;
  mana: number;
  manaMaxima: number;
  maoCartas: Card[];
  cartasCampo: Card[];
  deck: Card[];
}

export interface GameState {
  jogador: Player;
  bot: Player;
  turnoAtual: 'jogador' | 'bot';
  fase: 'menu' | 'jogo' | 'fim';
  vencedor?: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  turnoNumero: number;
  cartaSelecionada?: Card;
  alvoSelecionado?: Card | 'vida';
  animacaoAtaque?: {
    atacante: Card;
    alvo: Card | 'vida';
    tipo: 'ataque' | 'defesa';
  };
}