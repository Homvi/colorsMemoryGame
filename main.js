let cardsList = document.getElementsByClassName("card");
let cardsArr = Array.from(cardsList);
let clickedCards = [];
let pairsFound = [];

let gameOverAction = () => {
  if (pairsFound.length == 18) {
    alert("Ügyes fiú!!");
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
};

const actionOnPair = () => {
  if (clickedCards.length == 2) {
    console.log("You have turned two cards up!");
    //check if pair has found
    if (
      clickedCards[0] == `${clickedCards[1]}2` ||
      clickedCards[1] == `${clickedCards[0]}2`
    ) {
      //handle if pair
      const card1 = document.querySelector(`[data-name=${clickedCards[0]}]`);
      const card2 = document.querySelector(`[data-name=${clickedCards[1]}]`);
      card1.removeEventListener("click", flipCard);
      card2.removeEventListener("click", flipCard);
      alert("Szép munka!");
      pairsFound.push(card1);
      pairsFound.push(card2);
      clickedCards = [];
      gameOverAction();
    }
    if (
      clickedCards[0] !== `${clickedCards[1]}2` ||
      clickedCards[1] !== `${clickedCards[0]}2`
    ) {
      //handle if not a pair
      const card1 = document.querySelector(`[data-name=${clickedCards[0]}]`);
      const card2 = document.querySelector(`[data-name=${clickedCards[1]}]`);
      setTimeout(() => {
        card1.classList.toggle("backSide");
        card2.classList.toggle("backSide");
      }, 2000);
      console.log("that is not a pair");
      clickedCards = [];
    }
  }
};

//randomize order
const randomizeOrder = () => {
  cardsArr.map((card) => {
    let randomNumber = Math.floor(Math.random() * 20);
    card.style.order = randomNumber;
  });
};
randomizeOrder();

let flipCard = (e) => {
  e.target.classList.toggle("backSide");
  console.log(`The clicked card is: ${e.target.dataset.name}`);
  clickedCards.push(e.target.dataset.name);
  console.log(`Clicked cards: ${clickedCards}`);
  actionOnPair();
};

let addEventListenerToCards = () => {
  cardsArr.map((card) => {
    card.addEventListener("click", flipCard);
  });
};

let removeEventListenerFromCards = () => {
  cardsArr.map((card) => {
    card.removeEventListener("click", flipCard);
  });
};

addEventListenerToCards();
