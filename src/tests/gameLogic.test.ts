import { describe, test, expect } from 'vitest';
import {
  embaralharCartas,
  aplicarDano,
  podeAtacar,
  podeAtacarVida,
  comprarCarta
} from '../utils/gameLogic';

import { TipoCarta } from '../types/game';

describe('gameLogic', () => {

  test('embaralharCartas deve manter a quantidade de cartas', () => {
    const cartas = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ];

    const resultado = embaralharCartas(cartas as any);

    expect(resultado.length).toBe(3);
  });

  test('aplicarDano deve reduzir a defesa atual', () => {
    const carta = {
      defesaAtual: 10
    };

    const resultado = aplicarDano(carta as any, 4);

    expect(resultado.defesaAtual).toBe(6);
  });

  test('aplicarDano não deve deixar defesa negativa', () => {
    const carta = {
      defesaAtual: 5
    };

    const resultado = aplicarDano(carta as any, 10);

    expect(resultado.defesaAtual).toBe(0);
  });

  test('podeAtacar deve retornar true para criatura que não atacou', () => {
    const carta = {
      tipo: TipoCarta.CRIATURA,
      jaAtacou: false
    };

    expect(podeAtacar(carta as any)).toBe(true);
  });

  test('podeAtacar deve retornar false para criatura que já atacou', () => {
    const carta = {
      tipo: TipoCarta.CRIATURA,
      jaAtacou: true
    };

    expect(podeAtacar(carta as any)).toBe(false);
  });

  test('podeAtacarVida deve retornar true quando não existem cartas no campo', () => {
    const defensor = {
      cartasCampo: []
    };

    expect(
      podeAtacarVida({} as any, defensor as any)
    ).toBe(true);
  });

  test('comprarCarta deve adicionar carta à mão', () => {
    const player = {
      deck: [
        { id: 1, nome: 'Carta Teste' }
      ],
      maoCartas: []
    };

    const resultado = comprarCarta(player as any);

    expect(resultado.maoCartas.length).toBe(1);
    expect(resultado.deck.length).toBe(0);
  });

});