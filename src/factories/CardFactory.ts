import { Card } from '../types/game';

export class CardFactory {
  static criar(carta: Card): Card {
    return {
      ...carta,
      defesaAtual: carta.defesa,
      jaAtacou: false
    };
  }
}