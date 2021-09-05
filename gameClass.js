//grabbing elements from html
let cardsList = document.getElementsByClassName("card");
let pairsFoundData = document.querySelector(".pairsFoundData");

//declare global variables
let clickedCards = [];
let pairsFound = [];
let cardsArr = Array.from(cardsList);

//declare object for gameFunctions

export const colorsMemoryGame = {
  gameOverAction() {
    if (pairsFound.length == 18) {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  },

  randomizeOrder() {
    cardsArr.map((card) => {
      let randomNumber = Math.floor(Math.random() * 20);
      card.style.order = randomNumber;
    });
  },

  flipCard(e) {
    e.target.classList.toggle("backSide");
    clickedCards.push(e.target.dataset.name);
    colorsMemoryGame.actionOnPair();
    if (pairsFound) {
      pairsFoundData.innerHTML = `${pairsFound.length / 2} of 9`;
    }
  },

  actionOnPair() {
    if (clickedCards.length == 2) {
      colorsMemoryGame.removeEventListenerFromCards();
      setTimeout(() => {
        colorsMemoryGame.addEventListenerToCards();
      }, 1000);
      //check if pair has found
      if (
        clickedCards[0] == `${clickedCards[1]}2` ||
        clickedCards[1] == `${clickedCards[0]}2`
      ) {
        //handle if pair
        const card1 = document.querySelector(`[data-name=${clickedCards[0]}]`);
        const card2 = document.querySelector(`[data-name=${clickedCards[1]}]`);
        card1.removeEventListener("click", colorsMemoryGame.flipCard);
        card2.removeEventListener("click", colorsMemoryGame.flipCard);
        pairsFound.push(card1);
        pairsFound.push(card2);
        clickedCards = [];
        card1.classList.add("invisible");
        card2.classList.add("invisible");
        colorsMemoryGame.gameOverAction();
      }
      if (
        clickedCards[0] !== `${clickedCards[1]}2` ||
        clickedCards[1] !== `${clickedCards[0]}2`
      ) {
        //handle if not a pair
        const card1 = document.querySelector(`[data-name=${clickedCards[0]}]`);
        const card2 = document.querySelector(`[data-name=${clickedCards[1]}]`);
        setTimeout(() => {
          if (card1 && card2) {
            card1.classList.toggle("backSide");
            card2.classList.toggle("backSide");
          }
        }, 1000);
        clickedCards = [];
      }
    }
  },
  //add event listener to the visible cards
  addEventListenerToCards() {
    cardsArr.map((card) => {
      if (pairsFound.indexOf(card) == -1) {
        card.addEventListener("click", colorsMemoryGame.flipCard);
      }
    });
  },

  removeEventListenerFromCards() {
    cardsArr.map((card) => {
      card.removeEventListener("click", colorsMemoryGame.flipCard);
    });
  },
  prepareGame(){
    colorsMemoryGame.randomizeOrder();
    colorsMemoryGame.addEventListenerToCards();
  }
};
