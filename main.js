let cardsList = document.getElementsByClassName("card");
let cardsArr = Array.from(cardsList);
let clickedCards = [];
let pairsFound = [];
let pairsFoundData = document.querySelector(".pairsFoundData");

let gameOverAction = () => {
  if (pairsFound.length == 18) {
    alert("Szép volt!");
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
};

const actionOnPair = () => {
  if (clickedCards.length == 2) {
    removeEventListenerFromCards();
    setTimeout(() => {
      addEventListenerToCards();
    }, 1000);
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
  clickedCards.push(e.target.dataset.name);
  actionOnPair();
  if (pairsFound) {
    pairsFoundData.innerHTML = `${pairsFound.length / 2} of 9`;
  }
};

let addEventListenerToCards = () => {
  cardsArr.map((card) => {
    if (pairsFound.indexOf(card) == -1) {
      card.addEventListener("click", flipCard);
    }
  });
};

let removeEventListenerFromCards = () => {
  cardsArr.map((card) => {
    card.removeEventListener("click", flipCard);
  });
};

addEventListenerToCards();
