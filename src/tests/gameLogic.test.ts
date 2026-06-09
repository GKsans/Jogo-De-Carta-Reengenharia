import { describe, test, expect } from 'vitest';
import { embaralharCartas } from '../utils/gameLogic';

describe('embaralharCartas', () => {

  test('deve manter a quantidade de cartas', () => {

    const cartas = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ];

    const resultado = embaralharCartas(cartas as any);

    expect(resultado.length).toBe(3);

  });

});