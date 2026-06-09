import { GameTurnState } from './GameTurnState';

export class BotTurnState implements GameTurnState {

  executar(): string {
    return 'Turno do Bot';
  }

}