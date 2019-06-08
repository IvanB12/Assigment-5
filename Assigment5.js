const cards = document.querySelectorAll('.card');

var flippingCard = false;
var lockBoard = false;
var firstCard, secondCard;
var matchCounter = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!flippingCard) {
        flippingCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    matchChecking();
}

function matchChecking() {
    var Match = firstCard.dataset.framework === secondCard.dataset.framework;

    Match ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    refreshBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        refreshBoard();
    }, 1000);
}

function refreshBoard() {
    [flippingCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    console.log("yes, works")
}


(function shuffleCards() {
    cards.forEach(card => {
        var randomPlace = Math.floor(Math.random() * 12);
        card.style.order = randomPlace;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));