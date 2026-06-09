export interface Card {
  id: number;
  nome: string;
  ataque: number;
  defesa: number;
  defesaAtual: number; // Nova propriedade para vida atual da carta
  custo: number;
  descricao: string;
  tipo: 'Criatura' | 'Magia' | 'Armadilha';
  raridade: 'Comum' | 'Raro' | 'Épico' | 'Lendário';
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