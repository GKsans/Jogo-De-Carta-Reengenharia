# 🃏 Batalha de Cartas - Jogo Estratégico

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd batalha-de-cartas
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

4. Abra no navegador:
```
http://localhost:5173
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Card.tsx        # Componente de carta
│   ├── GameBoard.tsx   # Tela do jogo
│   └── MainMenu.tsx    # Menu principal
├── data/
│   └── cards.ts        # Base de dados das cartas
├── types/
│   └── game.ts         # Tipos TypeScript
├── utils/
│   ├── gameLogic.ts    # Lógica do jogo
│   └── botAI.ts        # Inteligência artificial
└── App.tsx             # Componente principal
```


## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização moderna
- **Lucide React** - Ícones elegantes
- **Vite** - Build tool rápida


Um jogo épico de batalha de cartas desenvolvido em React com TypeScript, oferecendo uma experiência completa com inteligência artificial avançada e mecânicas estratégicas profundas.

## 🎮 Sobre o Jogo

Batalha de Cartas é um jogo de estratégia onde você duela contra uma IA inteligente usando um deck de 25 cartas selecionadas aleatoriamente de um conjunto de 50 cartas únicas. Cada partida é única e desafiadora!

### 🌟 Características Principais

- **50 Cartas Únicas**: Coleção diversificada com criaturas, magias e armadilhas
- **Sistema de Raridades**: Comum, Raro, Épico e Lendário
- **3 Níveis de Dificuldade**: Fácil, Médio e Difícil
- **IA Avançada**: Bot com estratégias diferentes para cada nível
- **Animações Fluidas**: Efeitos visuais impressionantes para ataques e ações
- **Interface Intuitiva**: Design moderno e responsivo

## 🎯 Como Jogar

### Objetivo
Reduza a vida do oponente de 30 para 0 pontos usando suas cartas estrategicamente.

### Regras Básicas

1. **Início da Partida**:
   - Cada jogador começa com 4 cartas na mão
   - Vida inicial: 30 pontos
   - Mana inicial: 1 ponto

2. **Durante o Turno**:
   - Ganhe +1 mana (máximo 10)
   - Compre 1 carta do seu deck
   - Jogue cartas pagando seu custo em mana
   - Ataque com criaturas no campo
   - Passe o turno

3. **Sistema de Combate**:
   - Criaturas têm **Ataque** e **Defesa**
   - Só pode atacar a vida inimiga se o campo adversário estiver vazio
   - Cartas com defesa ≤ dano recebido são destruídas
   - Magias e armadilhas causam efeitos especiais

### 🃏 Tipos de Cartas

#### 🗡️ Criaturas
- Ficam no campo de batalha
- Podem atacar outras criaturas ou a vida do oponente
- Possuem valores de ataque e defesa

#### ⚡ Magias
- Efeito imediato ao serem jogadas
- Podem causar dano direto ou curar
- Vão para o descarte após o uso

#### 💣 Armadilhas
- Efeitos especiais e táticos
- Podem controlar o campo de batalha
- Estratégias defensivas e ofensivas

## 🤖 Níveis de Dificuldade

### 🟢 Fácil
- **Estratégia**: Aleatória
- **Comportamento**: Joga cartas sem planejamento, ataques desorganizados
- **Ideal para**: Iniciantes aprendendo as mecânicas

### 🟡 Médio  
- **Estratégia**: Equilibrada
- **Comportamento**: Prioriza cartas de baixo custo, ataques eficientes
- **Ideal para**: Jogadores com experiência básica

### 🔴 Difícil
- **Estratégia**: Avançada
- **Comportamento**: Analisa vantagem no campo, otimiza trocas, planeja jogadas
- **Ideal para**: Mestres em busca de desafio máximo

## 🎨 Sistema de Raridades

| Raridade | Cor | Características |
|----------|-----|-----------------|
| **Comum** | Cinza | Cartas básicas, fáceis de usar |
| **Raro** | Azul | Mais poderosas, efeitos interessantes |
| **Épico** | Roxo | Muito poderosas, alta estratégia |
| **Lendário** | Dourado | Extremamente raras e poderosas |


## 🎲 Exemplos de Cartas

### Criaturas Lendárias
- **Criador Supremo** (20/20, Custo: 20) - O ser supremo
- **Dragão Cósmico** (12/10, Custo: 15) - Nascido das estrelas
- **Titã Primordial** (10/12, Custo: 15) - Força ancestral

### Magias Épicas  
- **Apocalipse** (10 dano, Custo: 8) - Fim dos tempos
- **Milagre Divino** (10 cura, Custo: 8) - Intervenção divina

### Armadilhas Especiais
- **Colapso Dimensional** (8/2, Custo: 7) - Destroi a realidade
- **Selo do Banimento** (6/6, Custo: 8) - Exílio dimensional

## 🏆 Estratégias Avançadas

1. **Controle de Mana**: Gerencie recursos cuidadosamente
2. **Vantagem de Cartas**: Mantenha opções na mão
3. **Controle de Campo**: Proteja-se de ataques diretos
4. **Timing**: Saiba quando ser agressivo ou defensivo
5. **Combos**: Combine cartas para efeitos devastadores

## 🔧 Builds e Deploy

### Build de Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Reportar bugs
2. Sugerir novas funcionalidades  
3. Criar pull requests
4. Melhorar a documentação

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🎉 Créditos

Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento web moderno.

---

**Divirta-se jogando Batalha de Cartas!** ⚔️🃏✨