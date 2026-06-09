import { GameState } from '../types/game';

export interface Observer {
  update(state: GameState): void;
}

export class GameObserver {

  private observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  notify(state: GameState) {
    this.observers.forEach(obs => obs.update(state));
  }

}