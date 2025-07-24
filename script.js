const emojis = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉'];
let cards = [...emojis, ...emojis];
cards = cards.sort(() => Math.random() - 0.5);

const board = document.getElementById('gameBoard');
let flippedCards = [];
let matched = 0;

cards.forEach(emoji => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;
  card.textContent = '';
  board.appendChild(card);

  card.addEventListener('click', () => {
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    card.textContent = emoji;
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.dataset.emoji === second.dataset.emoji) {
        matched += 1;
        flippedCards = [];
        if (matched === emojis.length) {
          document.getElementById('status').textContent = '🎉 تهانينا! أنهيت اللعبة!';
        }
      } else {
        setTimeout(() => {
          first.textContent = '';
          second.textContent = '';
          first.classList.remove('flipped');
          second.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }
  });
});
