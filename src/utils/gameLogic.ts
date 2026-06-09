import { Card, Player, GameState } from '../types/game';
import { TODAS_CARTAS } from '../data/cards';

export function embaralharCartas(cartas: Card[]): Card[] {
  const cartasEmbaralhadas = [...cartas];
  for (let i = cartasEmbaralhadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartasEmbaralhadas[i], cartasEmbaralhadas[j]] = [cartasEmbaralhadas[j], cartasEmbaralhadas[i]];
  }
  return cartasEmbaralhadas;
}

export function criarCartaComVidaCompleta(carta: Card): Card {
  return {
    ...carta,
    defesaAtual: carta.defesa
  };
}

export function distribuirCartas(): { jogadorDeck: Card[], botDeck: Card[] } {
  const cartasEmbaralhadas = embaralharCartas(TODAS_CARTAS);
  
  // Cada jogador recebe 25 cartas aleatórias do pool de 50
  const jogadorDeck = cartasEmbaralhadas.slice(0, 25).map(criarCartaComVidaCompleta);
  const botDeck = cartasEmbaralhadas.slice(25, 50).map(criarCartaComVidaCompleta);
  
  return { jogadorDeck, botDeck };
}

export function comprarCarta(player: Player): Player {
  if (player.deck.length === 0) return player;
  
  const novaCarta = player.deck[0];
  return {
    ...player,
    deck: player.deck.slice(1),
    maoCartas: [...player.maoCartas, novaCarta]
  };
}

export function inicializarJogo(dificuldade: 'facil' | 'medio' | 'dificil'): GameState {
  const { jogadorDeck, botDeck } = distribuirCartas();
  
  // Cartas iniciais na mão (4 cartas cada)
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

export function podeAtacarVida(atacante: Player, defensor: Player): boolean {
  return defensor.cartasCampo.length === 0;
}

export function podeAtacar(carta: Card): boolean {
  return !carta.jaAtacou && carta.tipo === 'Criatura';
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
  
  // Verificar se a carta pode atacar
  if (!podeAtacar(atacante)) {
    return estado;
  }
  
  let novoEstado = { ...estado };
  
  // Marcar carta como tendo atacado
  const cartaAtacanteAtualizada = { ...atacante, jaAtacou: true };
  jogadorAtacante = {
    ...jogadorAtacante,
    cartasCampo: jogadorAtacante.cartasCampo.map(c => 
      c.id === atacante.id ? cartaAtacanteAtualizada : c
    )
  };
  
  if (alvo === 'vida') {
    // Atacar vida diretamente
    if (podeAtacarVida(jogadorAtacante, jogadorDefensor)) {
      const novaVida = Math.max(0, jogadorDefensor.vida - atacante.ataque);
      jogadorDefensor = { ...jogadorDefensor, vida: novaVida };
      
      // Verificar fim de jogo
      if (novaVida <= 0) {
        novoEstado.fase = 'fim';
        novoEstado.vencedor = isJogadorAtacando ? 'Jogador' : 'Bot';
      }
    }
  } else {
    // Atacar carta - aplicar dano mútuo
    const cartaAlvo = alvo as Card;
    
    // Aplicar dano à carta alvo
    const cartaAlvoComDano = aplicarDano(cartaAlvo, atacante.ataque);
    
    // Aplicar dano à carta atacante (se a carta alvo ainda estiver viva)
    let cartaAtacanteComDano = cartaAtacanteAtualizada;
    if (cartaAlvoComDano.defesaAtual > 0) {
      cartaAtacanteComDano = aplicarDano(cartaAtacanteAtualizada, cartaAlvo.ataque);
    }
    
    // Atualizar cartas no campo
    jogadorAtacante = {
      ...jogadorAtacante,
      cartasCampo: jogadorAtacante.cartasCampo.map(c => 
        c.id === atacante.id ? cartaAtacanteComDano : c
      ).filter(c => c.defesaAtual > 0) // Remover cartas mortas
    };
    
    jogadorDefensor = {
      ...jogadorDefensor,
      cartasCampo: jogadorDefensor.cartasCampo.map(c => 
        c.id === cartaAlvo.id ? cartaAlvoComDano : c
      ).filter(c => c.defesaAtual > 0) // Remover cartas mortas
    };
  }
  
  // Atualizar estado
  if (isJogadorAtacando) {
    novoEstado.jogador = jogadorAtacante;
    novoEstado.bot = jogadorDefensor;
  } else {
    novoEstado.bot = jogadorAtacante;
    novoEstado.jogador = jogadorDefensor;
  }
  
  return novoEstado;
}

export function jogarCarta(estado: GameState, carta: Card): GameState {
  const isJogadorTurno = estado.turnoAtual === 'jogador';
  const jogadorAtual = isJogadorTurno ? estado.jogador : estado.bot;
  
  // Verificar se tem mana suficiente
  if (jogadorAtual.mana < carta.custo) {
    return estado;
  }
  
  let novoEstado = { ...estado };
  
  if (carta.tipo === 'Criatura') {
    // Jogar criatura no campo
    const cartaComVidaCompleta = criarCartaComVidaCompleta(carta);
    const novoJogador = {
      ...jogadorAtual,
      mana: jogadorAtual.mana - carta.custo,
      maoCartas: jogadorAtual.maoCartas.filter(c => c.id !== carta.id),
      cartasCampo: [...jogadorAtual.cartasCampo, { ...cartaComVidaCompleta, jaAtacou: false }]
    };
    
    novoEstado = {
      ...novoEstado,
      [isJogadorTurno ? 'jogador' : 'bot']: novoJogador
    };
  } else {
    // Magia ou Armadilha - efeito imediato
    const jogadorOponente = isJogadorTurno ? estado.bot : estado.jogador;
    let novoJogadorAtual = {
      ...jogadorAtual,
      mana: jogadorAtual.mana - carta.custo,
      maoCartas: jogadorAtual.maoCartas.filter(c => c.id !== carta.id)
    };
    let novoJogadorOponente = { ...jogadorOponente };
    
    // Aplicar efeito da carta
    if (carta.ataque > 0) {
      // Dano
      novoJogadorOponente.vida = Math.max(0, novoJogadorOponente.vida - carta.ataque);
    }
    if (carta.defesa > 0) {
      // Cura
      novoJogadorAtual.vida = Math.min(30, novoJogadorAtual.vida + carta.defesa);
    }
    
    // Verificar fim de jogo
    if (novoJogadorOponente.vida <= 0) {
      novoEstado.fase = 'fim';
      novoEstado.vencedor = isJogadorTurno ? 'Jogador' : 'Bot';
    }
    
    novoEstado = {
      ...novoEstado,
      [isJogadorTurno ? 'jogador' : 'bot']: novoJogadorAtual,
      [isJogadorTurno ? 'bot' : 'jogador']: novoJogadorOponente
    };
  }
  
  return novoEstado;
}

export function passarTurno(estado: GameState): GameState {
  const proximoTurno = estado.turnoAtual === 'jogador' ? 'bot' : 'jogador';
  const novoNumeroTurno = proximoTurno === 'jogador' ? estado.turnoNumero + 1 : estado.turnoNumero;
  
  // Resetar ataques das cartas e aumentar mana
  let novoJogador = estado.jogador;
  let novoBot = estado.bot;
  
  if (proximoTurno === 'jogador') {
    // Turno do jogador
    const novaManaMaxima = Math.min(10, estado.jogador.manaMaxima + 1);
    novoJogador = {
      ...comprarCarta(estado.jogador),
      mana: novaManaMaxima,
      manaMaxima: novaManaMaxima,
      cartasCampo: estado.jogador.cartasCampo.map(c => ({ ...c, jaAtacou: false }))
    };
  } else {
    // Turno do bot
    const novaManaMaxima = Math.min(10, estado.bot.manaMaxima + 1);
    novoBot = {
      ...comprarCarta(estado.bot),
      mana: novaManaMaxima,
      manaMaxima: novaManaMaxima,
      cartasCampo: estado.bot.cartasCampo.map(c => ({ ...c, jaAtacou: false }))
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