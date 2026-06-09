import { Card } from '../types/game';

export const TODAS_CARTAS: Card[] = [
  // Criaturas Comuns
  { id: 1, nome: 'Goblin Guerreiro', ataque: 2, defesa: 1, defesaAtual: 1, custo: 1, descricao: 'Um pequeno mas feroz guerreiro goblin.', tipo: 'Criatura', raridade: 'Comum' },
  { id: 2, nome: 'Orc Bruto', ataque: 3, defesa: 2, defesaAtual: 2, custo: 2, descricao: 'Força bruta em sua forma mais pura.', tipo: 'Criatura', raridade: 'Comum' },
  { id: 3, nome: 'Soldado Élfico', ataque: 2, defesa: 3, defesaAtual: 3, custo: 2, descricao: 'Defensor habilidoso das florestas élficas.', tipo: 'Criatura', raridade: 'Comum' },
  { id: 4, nome: 'Lobo das Sombras', ataque: 3, defesa: 1, defesaAtual: 1, custo: 2, descricao: 'Veloz predador noturno.', tipo: 'Criatura', raridade: 'Comum' },
  { id: 5, nome: 'Esqueleto Arqueiro', ataque: 1, defesa: 2, defesaAtual: 2, custo: 1, descricao: 'Morto-vivo com precisão letal.', tipo: 'Criatura', raridade: 'Comum' },
  { id: 6, nome: 'Cavaleiro Novato', ataque: 2, defesa: 4, defesaAtual: 4, custo: 3, descricao: 'Jovem cavaleiro em busca de glória.', tipo: 'Criatura', raridade: 'Comum' },
  { id: 7, nome: 'Mago Aprendiz', ataque: 1, defesa: 3, defesaAtual: 3, custo: 2, descricao: 'Estudante de magia com potencial.', tipo: 'Criatura', raridade: 'Comum' },
  { id: 8, nome: 'Bárbaro Selvagem', ataque: 4, defesa: 1, defesaAtual: 1, custo: 3, descricao: 'Força descontrolada das terras selvagens.', tipo: 'Criatura', raridade: 'Comum' },
  { id: 9, nome: 'Clérigo Curador', ataque: 1, defesa: 4, defesaAtual: 4, custo: 3, descricao: 'Devoto seguidor da luz divina.', tipo: 'Criatura', raridade: 'Comum' },
  { id: 10, nome: 'Ladino Sombrio', ataque: 3, defesa: 2, defesaAtual: 2, custo: 2, descricao: 'Mestre em combate furtivo.', tipo: 'Criatura', raridade: 'Comum' },

  // Criaturas Raras
  { id: 11, nome: 'Dragão Jovem', ataque: 5, defesa: 4, defesaAtual: 4, custo: 6, descricao: 'Um dragão ainda em crescimento, mas já poderoso.', tipo: 'Criatura', raridade: 'Raro' },
  { id: 12, nome: 'Paladino Sagrado', ataque: 4, defesa: 5, defesaAtual: 5, custo: 5, descricao: 'Guerreiro abençoado pela luz divina.', tipo: 'Criatura', raridade: 'Raro' },
  { id: 13, nome: 'Necromante Sombrio', ataque: 3, defesa: 4, defesaAtual: 4, custo: 4, descricao: 'Mestre das artes necromânticas.', tipo: 'Criatura', raridade: 'Raro' },
  { id: 14, nome: 'Gigante de Pedra', ataque: 6, defesa: 6, defesaAtual: 6, custo: 7, descricao: 'Colosso feito de rocha sólida.', tipo: 'Criatura', raridade: 'Raro' },
  { id: 15, nome: 'Fênix Flamejante', ataque: 4, defesa: 3, defesaAtual: 3, custo: 5, descricao: 'Ave mítica que renasce das cinzas.', tipo: 'Criatura', raridade: 'Raro' },
  { id: 16, nome: 'Vampiro Ancestral', ataque: 5, defesa: 3, defesaAtual: 3, custo: 5, descricao: 'Morto-vivo com sede de sangue.', tipo: 'Criatura', raridade: 'Raro' },
  { id: 17, nome: 'Elemental do Fogo', ataque: 5, defesa: 2, defesaAtual: 2, custo: 4, descricao: 'Espírito puro das chamas.', tipo: 'Criatura', raridade: 'Raro' },
  { id: 18, nome: 'Druida Ancião', ataque: 3, defesa: 6, defesaAtual: 6, custo: 5, descricao: 'Guardião sábio da natureza.', tipo: 'Criatura', raridade: 'Raro' },

  // Criaturas Épicas
  { id: 19, nome: 'Dragão Antigo', ataque: 8, defesa: 6, defesaAtual: 6, custo: 9, descricao: 'Dragão milenário de poder incomparável.', tipo: 'Criatura', raridade: 'Épico' },
  { id: 20, nome: 'Arquidemônio', ataque: 7, defesa: 5, defesaAtual: 5, custo: 8, descricao: 'Senhor dos demônios das profundezas.', tipo: 'Criatura', raridade: 'Épico' },
  { id: 21, nome: 'Anjo da Guerra', ataque: 6, defesa: 7, defesaAtual: 7, custo: 8, descricao: 'Guerreiro celestial implacável.', tipo: 'Criatura', raridade: 'Épico' },
  { id: 22, nome: 'Lich Supremo', ataque: 5, defesa: 8, defesaAtual: 8, custo: 9, descricao: 'Mago morto-vivo de poder absoluto.', tipo: 'Criatura', raridade: 'Épico' },

  // Criaturas Lendárias
  { id: 23, nome: 'Dragão Cósmico', ataque: 12, defesa: 10, defesaAtual: 10, custo: 15, descricao: 'Dragão nascido das estrelas.', tipo: 'Criatura', raridade: 'Lendário' },
  { id: 24, nome: 'Titã Primordial', ataque: 10, defesa: 12, defesaAtual: 12, custo: 15, descricao: 'Ser primordial da criação.', tipo: 'Criatura', raridade: 'Lendário' },

  // Magias Comuns
  { id: 25, nome: 'Bola de Fogo', ataque: 3, defesa: 0, defesaAtual: 0, custo: 2, descricao: 'Causa 3 de dano a qualquer alvo.', tipo: 'Magia', raridade: 'Comum' },
  { id: 26, nome: 'Cura Menor', ataque: 0, defesa: 3, defesaAtual: 3, custo: 1, descricao: 'Restaura 3 pontos de vida.', tipo: 'Magia', raridade: 'Comum' },
  { id: 27, nome: 'Raio Gélido', ataque: 2, defesa: 0, defesaAtual: 0, custo: 1, descricao: 'Congela e causa 2 de dano.', tipo: 'Magia', raridade: 'Comum' },
  { id: 28, nome: 'Escudo Arcano', ataque: 0, defesa: 4, defesaAtual: 4, custo: 2, descricao: 'Protege com barreira mágica.', tipo: 'Magia', raridade: 'Comum' },
  { id: 29, nome: 'Relâmpago', ataque: 4, defesa: 0, defesaAtual: 0, custo: 3, descricao: 'Ataque elétrico devastador.', tipo: 'Magia', raridade: 'Comum' },
  { id: 30, nome: 'Benção Divina', ataque: 0, defesa: 2, defesaAtual: 2, custo: 1, descricao: 'Fortalece aliados próximos.', tipo: 'Magia', raridade: 'Comum' },

  // Magias Raras
  { id: 31, nome: 'Meteoro', ataque: 6, defesa: 0, defesaAtual: 0, custo: 5, descricao: 'Devastação cósmica.', tipo: 'Magia', raridade: 'Raro' },
  { id: 32, nome: 'Ressurreição', ataque: 0, defesa: 5, defesaAtual: 5, custo: 4, descricao: 'Traz de volta um aliado caído.', tipo: 'Magia', raridade: 'Raro' },
  { id: 33, nome: 'Tempestade', ataque: 5, defesa: 0, defesaAtual: 0, custo: 4, descricao: 'Fúria da natureza desencadeada.', tipo: 'Magia', raridade: 'Raro' },
  { id: 34, nome: 'Portal Sombrio', ataque: 4, defesa: 2, defesaAtual: 2, custo: 5, descricao: 'Abre passagem para as trevas.', tipo: 'Magia', raridade: 'Raro' },

  // Magias Épicas
  { id: 35, nome: 'Apocalipse', ataque: 10, defesa: 0, defesaAtual: 0, custo: 8, descricao: 'Fim dos tempos.', tipo: 'Magia', raridade: 'Épico' },
  { id: 36, nome: 'Milagre Divino', ataque: 0, defesa: 10, defesaAtual: 10, custo: 8, descricao: 'Intervenção dos deuses.', tipo: 'Magia', raridade: 'Épico' },

  // Armadilhas Comuns
  { id: 37, nome: 'Armadilha de Espinhos', ataque: 2, defesa: 1, defesaAtual: 1, custo: 1, descricao: 'Espinhos afiados emergem do solo.', tipo: 'Armadilha', raridade: 'Comum' },
  { id: 38, nome: 'Poço Oculto', ataque: 3, defesa: 0, defesaAtual: 0, custo: 2, descricao: 'Buraco disfarçado no chão.', tipo: 'Armadilha', raridade: 'Comum' },
  { id: 39, nome: 'Dardos Envenenados', ataque: 1, defesa: 2, defesaAtual: 2, custo: 1, descricao: 'Dardos com veneno paralisante.', tipo: 'Armadilha', raridade: 'Comum' },
  { id: 40, nome: 'Lâminas Rotativas', ataque: 4, defesa: 0, defesaAtual: 0, custo: 3, descricao: 'Lâminas que cortam tudo.', tipo: 'Armadilha', raridade: 'Comum' },

  // Armadilhas Raras
  { id: 41, nome: 'Explosão Arcana', ataque: 5, defesa: 1, defesaAtual: 1, custo: 4, descricao: 'Explosão mágica devastadora.', tipo: 'Armadilha', raridade: 'Raro' },
  { id: 42, nome: 'Prisão de Cristal', ataque: 2, defesa: 6, defesaAtual: 6, custo: 5, descricao: 'Aprisiona inimigos em cristal.', tipo: 'Armadilha', raridade: 'Raro' },
  { id: 43, nome: 'Vórtice Temporal', ataque: 3, defesa: 4, defesaAtual: 4, custo: 6, descricao: 'Distorce o tempo e espaço.', tipo: 'Armadilha', raridade: 'Raro' },

  // Armadilhas Épicas
  { id: 44, nome: 'Colapso Dimensional', ataque: 8, defesa: 2, defesaAtual: 2, custo: 7, descricao: 'Destroi a própria realidade.', tipo: 'Armadilha', raridade: 'Épico' },
  { id: 45, nome: 'Selo do Banimento', ataque: 6, defesa: 6, defesaAtual: 6, custo: 8, descricao: 'Bane inimigos para outra dimensão.', tipo: 'Armadilha', raridade: 'Épico' },

  // Cartas Especiais Lendárias
  { id: 46, nome: 'Carta do Destino', ataque: 0, defesa: 0, defesaAtual: 0, custo: 10, descricao: 'Reescreve as regras da batalha.', tipo: 'Magia', raridade: 'Lendário' },
  { id: 47, nome: 'Guardião Eterno', ataque: 8, defesa: 15, defesaAtual: 15, custo: 12, descricao: 'Protetor imortal dos antigos.', tipo: 'Criatura', raridade: 'Lendário' },
  { id: 48, nome: 'Espada do Infinito', ataque: 15, defesa: 5, defesaAtual: 5, custo: 10, descricao: 'Lâmina forjada pelos deuses.', tipo: 'Magia', raridade: 'Lendário' },
  { id: 49, nome: 'Coração do Mundo', ataque: 5, defesa: 10, defesaAtual: 10, custo: 12, descricao: 'Essência da própria vida.', tipo: 'Magia', raridade: 'Lendário' },
  { id: 50, nome: 'Criador Supremo', ataque: 20, defesa: 20, defesaAtual: 20, custo: 20, descricao: 'O ser que criou todas as coisas.', tipo: 'Criatura', raridade: 'Lendário' }
];