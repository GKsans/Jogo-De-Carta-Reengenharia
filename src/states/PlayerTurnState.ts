import { GameTurnState } from './GameTurnState';

export class PlayerTurnState implements GameTurnState {

  executar(): string {
    return 'Turno do Jogador';
  }

}