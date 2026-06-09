import { Card, GameState, Player } from '../types/game';
import { podeAtacarVida, executarAtaque, jogarCarta, podeAtacar, aplicarDano } from './gameLogic';

interface AcaoBot {
  tipo: 'jogar' | 'atacar' | 'passar';
  carta?: Card;
  alvo?: Card | 'vida';
}

export function calcularMelhorJogada(estado: GameState): AcaoBot {
  const bot = estado.bot;
  const jogador = estado.jogador;
  const dificuldade = estado.dificuldade;
  
  // Estratégias baseadas na dificuldade
  switch (dificuldade) {
    case 'facil':
      return jogadaFacil(bot, jogador);
    case 'medio':
      return jogadaMedio(bot, jogador);
    case 'dificil':
      return jogadaDificil(bot, jogador);
    default:
      return { tipo: 'passar' };
  }
}

function jogadaFacil(bot: Player, jogador: Player): AcaoBot {
  // IA Fácil: Sempre ataca quando possível, depois joga cartas
  
  // 1. SEMPRE atacar primeiro se possível
  const cartasQuePodemAtacar = bot.cartasCampo.filter(carta => podeAtacar(carta));
  if (cartasQuePodemAtacar.length > 0) {
    const cartaAtacante = cartasQuePodemAtacar[Math.floor(Math.random() * cartasQuePodemAtacar.length)];
    
    if (podeAtacarVida(bot, jogador)) {
      // Atacar vida se possível
      return { tipo: 'atacar', carta: cartaAtacante, alvo: 'vida' };
    } else if (jogador.cartasCampo.length > 0) {
      // Atacar carta aleatória
      const alvoAleatorio = jogador.cartasCampo[Math.floor(Math.random() * jogador.cartasCampo.length)];
      return { tipo: 'atacar', carta: cartaAtacante, alvo: alvoAleatorio };
    }
  }
  
  // 2. Jogar carta se tiver mana
  const cartasJogaveis = bot.maoCartas.filter(carta => carta.custo <= bot.mana);
  if (cartasJogaveis.length > 0) {
    const cartaAleatoria = cartasJogaveis[Math.floor(Math.random() * cartasJogaveis.length)];
    return { tipo: 'jogar', carta: cartaAleatoria };
  }
  
  return { tipo: 'passar' };
}

function jogadaMedio(bot: Player, jogador: Player): AcaoBot {
  // IA Médio: Estratégia mais inteligente, sempre ataca quando possível
  
  // 1. SEMPRE atacar primeiro - priorizar ataques eficientes
  const cartasQuePodemAtacar = bot.cartasCampo.filter(carta => podeAtacar(carta));
  if (cartasQuePodemAtacar.length > 0) {
    // Priorizar ataques que eliminam cartas inimigas sem perder a própria
    for (const cartaAtacante of cartasQuePodemAtacar) {
      for (const cartaInimiga of jogador.cartasCampo) {
        if (cartaAtacante.ataque >= cartaInimiga.defesaAtual && cartaAtacante.defesaAtual > cartaInimiga.ataque) {
          return { tipo: 'atacar', carta: cartaAtacante, alvo: cartaInimiga };
        }
      }
    }
    
    // Se pode atacar vida, atacar com a carta mais forte
    if (podeAtacarVida(bot, jogador)) {
      const cartaMaisForte = cartasQuePodemAtacar.reduce((max, carta) => 
        carta.ataque > max.ataque ? carta : max
      );
      return { tipo: 'atacar', carta: cartaMaisForte, alvo: 'vida' };
    }
    
    // Atacar carta mais fraca do inimigo
    if (jogador.cartasCampo.length > 0) {
      const cartaMaisFraca = jogador.cartasCampo.reduce((min, carta) => 
        carta.defesaAtual < min.defesaAtual ? carta : min
      );
      const cartaAtacante = cartasQuePodemAtacar[0];
      return { tipo: 'atacar', carta: cartaAtacante, alvo: cartaMaisFraca };
    }
  }
  
  // 2. Jogar cartas de baixo custo primeiro
  const cartasJogaveis = bot.maoCartas
    .filter(carta => carta.custo <= bot.mana)
    .sort((a, b) => a.custo - b.custo);
  
  if (cartasJogaveis.length > 0 && bot.cartasCampo.length < 7) {
    return { tipo: 'jogar', carta: cartasJogaveis[0] };
  }
  
  return { tipo: 'passar' };
}

function jogadaDificil(bot: Player, jogador: Player): AcaoBot {
  // IA Difícil: Estratégia avançada, sempre ataca quando possível
  
  // 1. SEMPRE atacar primeiro - análise avançada
  const cartasQuePodemAtacar = bot.cartasCampo.filter(carta => podeAtacar(carta));
  if (cartasQuePodemAtacar.length > 0) {
    // Calcular melhor sequência de ataques
    const melhorAtaque = calcularMelhorAtaque(cartasQuePodemAtacar, jogador);
    if (melhorAtaque) {
      return melhorAtaque;
    }
  }
  
  // 2. Análise da situação do campo para jogar cartas
  const vantagem = calcularVantagemCampo(bot, jogador);
  
  // Se estiver perdendo, priorizar defesa
  if (vantagem < -5) {
    const cartasDefensivas = bot.maoCartas
      .filter(carta => carta.custo <= bot.mana && carta.defesa >= carta.ataque)
      .sort((a, b) => b.defesa - a.defesa);
    
    if (cartasDefensivas.length > 0) {
      return { tipo: 'jogar', carta: cartasDefensivas[0] };
    }
  }
  
  // Jogar carta de melhor valor
  const cartasJogaveis = bot.maoCartas.filter(carta => carta.custo <= bot.mana);
  if (cartasJogaveis.length > 0) {
    const melhorCarta = cartasJogaveis.reduce((melhor, carta) => {
      const valorAtual = (carta.ataque + carta.defesa) / Math.max(carta.custo, 1);
      const valorMelhor = (melhor.ataque + melhor.defesa) / Math.max(melhor.custo, 1);
      return valorAtual > valorMelhor ? carta : melhor;
    });
    return { tipo: 'jogar', carta: melhorCarta };
  }
  
  return { tipo: 'passar' };
}

function calcularMelhorAtaque(cartasAtacantes: Card[], jogador: Player): AcaoBot | null {
  let melhorAtaque: AcaoBot | null = null;
  let melhorValor = -1;
  
  for (const cartaAtacante of cartasAtacantes) {
    // Verificar ataque à vida
    if (podeAtacarVida({ cartasCampo: cartasAtacantes } as Player, jogador)) {
      const valor = cartaAtacante.ataque * 2; // Priorizar dano direto
      if (valor > melhorValor) {
        melhorValor = valor;
        melhorAtaque = { tipo: 'atacar', carta: cartaAtacante, alvo: 'vida' };
      }
    }
    
    // Verificar ataques a cartas
    for (const cartaInimiga of jogador.cartasCampo) {
      const valor = calcularValorTrade(cartaAtacante, cartaInimiga);
      if (valor > melhorValor) {
        melhorValor = valor;
        melhorAtaque = { tipo: 'atacar', carta: cartaAtacante, alvo: cartaInimiga };
      }
    }
  }
  
  return melhorAtaque;
}

function calcularVantagemCampo(bot: Player, jogador: Player): number {
  const forcaBot = bot.cartasCampo.reduce((total, carta) => total + carta.ataque + carta.defesaAtual, 0);
  const forcaJogador = jogador.cartasCampo.reduce((total, carta) => total + carta.ataque + carta.defesaAtual, 0);
  
  return forcaBot - forcaJogador;
}

function calcularValorTrade(atacante: Card, defensor: Card): number {
  const custoDefensor = defensor.custo;
  const custoAtacante = atacante.custo;
  
  const atacanteSobrevive = atacante.defesaAtual > defensor.ataque;
  const defensorMorre = defensor.defesaAtual <= atacante.ataque;
  
  if (defensorMorre && atacanteSobrevive) {
    return custoDefensor * 3; // Trade muito favorável
  } else if (defensorMorre && !atacanteSobrevive) {
    return custoDefensor - custoAtacante + 1; // Trade neutro ou ligeiramente favorável
  } else if (!defensorMorre && atacanteSobrevive) {
    return 1; // Pelo menos causa dano
  } else {
    return -custoAtacante; // Trade desfavorável
  }
}

export function executarJogadaBot(estado: GameState): GameState {
  let estadoAtual = estado;
  let tentativas = 0;
  const maxTentativas = 10; // Evitar loop infinito
  
  // Bot continua jogando até não poder mais fazer nada
  while (tentativas < maxTentativas) {
    const acao = calcularMelhorJogada(estadoAtual);
    
    if (acao.tipo === 'passar') {
      break;
    }
    
    let novoEstado = estadoAtual;
    
    switch (acao.tipo) {
      case 'jogar':
        if (acao.carta) {
          novoEstado = jogarCarta(estadoAtual, acao.carta);
        }
        break;
      case 'atacar':
        if (acao.carta && acao.alvo) {
          novoEstado = executarAtaque(estadoAtual, acao.carta, acao.alvo);
        }
        break;
    }
    
    // Se o estado não mudou, parar para evitar loop
    if (novoEstado === estadoAtual) {
      break;
    }
    
    estadoAtual = novoEstado;
    tentativas++;
    
    // Se o jogo acabou, parar
    if (estadoAtual.fase === 'fim') {
      break;
    }
  }
  
  return estadoAtual;
}