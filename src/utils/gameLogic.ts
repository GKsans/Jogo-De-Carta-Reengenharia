import { Card, Player, GameState, TipoCarta } from '../types/game';
import { TODAS_CARTAS } from '../data/cards';
import { CardFactory } from '../factories/CardFactory';

export function embaralharCartas(cartas: Card[]): Card[] {
  const cartasEmbaralhadas = [...cartas];

  for (let i = cartasEmbaralhadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartasEmbaralhadas[i], cartasEmbaralhadas[j]] = [
      cartasEmbaralhadas[j],
      cartasEmbaralhadas[i]
    ];
  }

  return cartasEmbaralhadas;
}

export function criarCartaComVidaCompleta(carta: Card): Card {
  return CardFactory.criar(carta);
}

export function distribuirCartas(): { jogadorDeck: Card[]; botDeck: Card[] } {
  const cartasEmbaralhadas = embaralharCartas(TODAS_CARTAS);

  const jogadorDeck = cartasEmbaralhadas
    .slice(0, 25)
    .map(criarCartaComVidaCompleta);

  const botDeck = cartasEmbaralhadas
    .slice(25, 50)
    .map(criarCartaComVidaCompleta);

  return { jogadorDeck, botDeck };
}

export function comprarCarta(player: Player): Player {
  if (player.deck.length === 0) {
    return player;
  }

  const novaCarta = player.deck[0];

  return {
    ...player,
    deck: player.deck.slice(1),
    maoCartas: [...player.maoCartas, novaCarta]
  };
}

export function inicializarJogo(
  dificuldade: 'facil' | 'medio' | 'dificil'
): GameState {
  const { jogadorDeck, botDeck } = distribuirCartas();

  const jogadorMaoInicial = jogadorDeck.slice(0, 4);
  const botMaoInicial = botDeck.slice(0, 4);

  const jogador: Player = {
    id: 'jogador',
    nome: 'Jogador',
    vida: 30,
    mana: 1,
    manaMaxima: 1,
    maoCartas: jogadorMaoInicial,
    cartasCampo: [],
    deck: jogadorDeck.slice(4)
  };

  const bot: Player = {
    id: 'bot',
    nome: 'Bot',
    vida: 30,
    mana: 1,
    manaMaxima: 1,
    maoCartas: botMaoInicial,
    cartasCampo: [],
    deck: botDeck.slice(4)
  };

  return {
    jogador,
    bot,
    turnoAtual: 'jogador',
    fase: 'jogo',
    dificuldade,
    turnoNumero: 1
  };
}

export function podeAtacarVida(_atacante: Player, defensor: Player): boolean {
  return defensor.cartasCampo.length === 0;
}

export function podeAtacar(carta: Card): boolean {
  return !carta.jaAtacou && carta.tipo === TipoCarta.CRIATURA;
}

export function aplicarDano(carta: Card, dano: number): Card {
  const novaDefesaAtual = Math.max(0, carta.defesaAtual - dano);

  return {
    ...carta,
    defesaAtual: novaDefesaAtual
  };
}

export function executarAtaque(
  estado: GameState,
  atacante: Card,
  alvo: Card | 'vida'
): GameState {
  const isJogadorAtacando = estado.turnoAtual === 'jogador';

  let jogadorAtacante = isJogadorAtacando ? estado.jogador : estado.bot;
  let jogadorDefensor = isJogadorAtacando ? estado.bot : estado.jogador;

  if (!podeAtacar(atacante)) {
    return estado;
  }

  let novoEstado: GameState = { ...estado };

  const cartaAtacanteAtualizada: Card = {
    ...atacante,
    jaAtacou: true
  };

  jogadorAtacante = {
    ...jogadorAtacante,
    cartasCampo: jogadorAtacante.cartasCampo.map(carta =>
      carta.id === atacante.id ? cartaAtacanteAtualizada : carta
    )
  };

  if (alvo === 'vida') {
    if (podeAtacarVida(jogadorAtacante, jogadorDefensor)) {
      const novaVida = Math.max(0, jogadorDefensor.vida - atacante.ataque);

      jogadorDefensor = {
        ...jogadorDefensor,
        vida: novaVida
      };

      if (novaVida <= 0) {
        novoEstado = {
          ...novoEstado,
          fase: 'fim',
          vencedor: isJogadorAtacando ? 'Jogador' : 'Bot'
        };
      }
    }
  } else {
    const cartaAlvo = alvo;

    const cartaAlvoComDano = aplicarDano(cartaAlvo, atacante.ataque);

    let cartaAtacanteComDano = cartaAtacanteAtualizada;

    if (cartaAlvoComDano.defesaAtual > 0) {
      cartaAtacanteComDano = aplicarDano(
        cartaAtacanteAtualizada,
        cartaAlvo.ataque
      );
    }

    jogadorAtacante = {
      ...jogadorAtacante,
      cartasCampo: jogadorAtacante.cartasCampo
        .map(carta =>
          carta.id === atacante.id ? cartaAtacanteComDano : carta
        )
        .filter(carta => carta.defesaAtual > 0)
    };

    jogadorDefensor = {
      ...jogadorDefensor,
      cartasCampo: jogadorDefensor.cartasCampo
        .map(carta => (carta.id === cartaAlvo.id ? cartaAlvoComDano : carta))
        .filter(carta => carta.defesaAtual > 0)
    };
  }

  if (isJogadorAtacando) {
    novoEstado = {
      ...novoEstado,
      jogador: jogadorAtacante,
      bot: jogadorDefensor
    };
  } else {
    novoEstado = {
      ...novoEstado,
      bot: jogadorAtacante,
      jogador: jogadorDefensor
    };
  }

  return novoEstado;
}

export function jogarCarta(estado: GameState, carta: Card): GameState {
  const isJogadorTurno = estado.turnoAtual === 'jogador';
  const jogadorAtual = isJogadorTurno ? estado.jogador : estado.bot;

  if (jogadorAtual.mana < carta.custo) {
    return estado;
  }

  let novoEstado: GameState = { ...estado };

  if (carta.tipo === TipoCarta.CRIATURA) {
    const cartaComVidaCompleta = CardFactory.criar(carta);

    const novoJogador: Player = {
      ...jogadorAtual,
      mana: jogadorAtual.mana - carta.custo,
      maoCartas: jogadorAtual.maoCartas.filter(c => c.id !== carta.id),
      cartasCampo: [
        ...jogadorAtual.cartasCampo,
        {
          ...cartaComVidaCompleta,
          jaAtacou: false
        }
      ]
    };

    novoEstado = {
      ...novoEstado,
      [isJogadorTurno ? 'jogador' : 'bot']: novoJogador
    };
  } else {
    const jogadorOponente = isJogadorTurno ? estado.bot : estado.jogador;

    const novoJogadorAtual: Player = {
      ...jogadorAtual,
      mana: jogadorAtual.mana - carta.custo,
      maoCartas: jogadorAtual.maoCartas.filter(c => c.id !== carta.id)
    };

    let novoJogadorOponente: Player = {
      ...jogadorOponente
    };

    if (carta.ataque > 0) {
      novoJogadorOponente = {
        ...novoJogadorOponente,
        vida: Math.max(0, novoJogadorOponente.vida - carta.ataque)
      };
    }

    let jogadorAtualComEfeito = novoJogadorAtual;

    if (carta.defesa > 0) {
      jogadorAtualComEfeito = {
        ...jogadorAtualComEfeito,
        vida: Math.min(30, jogadorAtualComEfeito.vida + carta.defesa)
      };
    }

    if (novoJogadorOponente.vida <= 0) {
      novoEstado = {
        ...novoEstado,
        fase: 'fim',
        vencedor: isJogadorTurno ? 'Jogador' : 'Bot'
      };
    }

    novoEstado = {
      ...novoEstado,
      [isJogadorTurno ? 'jogador' : 'bot']: jogadorAtualComEfeito,
      [isJogadorTurno ? 'bot' : 'jogador']: novoJogadorOponente
    };
  }

  return novoEstado;
}

export function passarTurno(estado: GameState): GameState {
  const proximoTurno = estado.turnoAtual === 'jogador' ? 'bot' : 'jogador';
  const novoNumeroTurno =
    proximoTurno === 'jogador' ? estado.turnoNumero + 1 : estado.turnoNumero;

  let novoJogador = estado.jogador;
  let novoBot = estado.bot;

  if (proximoTurno === 'jogador') {
    const novaManaMaxima = Math.min(10, estado.jogador.manaMaxima + 1);

    novoJogador = {
      ...comprarCarta(estado.jogador),
      mana: novaManaMaxima,
      manaMaxima: novaManaMaxima,
      cartasCampo: estado.jogador.cartasCampo.map(carta => ({
        ...carta,
        jaAtacou: false
      }))
    };
  } else {
    const novaManaMaxima = Math.min(10, estado.bot.manaMaxima + 1);

    novoBot = {
      ...comprarCarta(estado.bot),
      mana: novaManaMaxima,
      manaMaxima: novaManaMaxima,
      cartasCampo: estado.bot.cartasCampo.map(carta => ({
        ...carta,
        jaAtacou: false
      }))
    };
  }

  return {
    ...estado,
    jogador: novoJogador,
    bot: novoBot,
    turnoAtual: proximoTurno,
    turnoNumero: novoNumeroTurno,
    cartaSelecionada: undefined,
    alvoSelecionado: undefined
  };
}