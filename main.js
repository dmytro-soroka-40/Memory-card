const cards = document.querySelectorAll('.memory-game__card');
const title = document.querySelector('.memory-game__title');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let matchAttemps = 0;

function flipCard() {
  if (this === firstCard || lockBoard) {
    return;
  }

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkMatch();
}

const checkMatch = () => {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  lockBoard = true;
  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
};

const disableCards = () => {
  setTimeout(() => {
    firstCard.classList.add('hide');
    secondCard.classList.add('hide');

    matchAttemps++;

    resetBoard();

    if (matchAttemps >= 6) {
      title.innerHTML = 'You win!';
    }
  }, 1000);
};

const unflipCards = () => {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
};

const resetBoard = () => {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

const shuffleCards = () => {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
};

shuffleCards();

cards.forEach((card) => card.addEventListener('click', flipCard));
