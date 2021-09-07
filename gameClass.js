//grabbing elements from html
let cardsList = document.getElementsByClassName("card");
let clicksData = document.querySelector(".clicksData");
let timeData = document.querySelector(".timeData");
let pairsFoundData = document.querySelector(".pairsFoundData");

//declare global variables
let clickedCards = [];
let pairsFound = [];
let numOfClicks = 0;
let timeSpentInSeconds = 0;
let cardsArr = Array.from(cardsList);

//declare object for gameFunctions
const colorsMemoryGame = {
  //Reload page when all the pairs found
  gameOverAction() {
    if (pairsFound.length == 18) {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  },
  //Count clicks
  countClicks() {
    numOfClicks += 1;
    if (clicksData) {
      clicksData.innerHTML = numOfClicks;
    }
  },
  //start counting when started
  setAndStartTimer() {
    if (numOfClicks == 1) {
      setInterval(() => {
        timeSpentInSeconds += 1;
        timeData.innerHTML = `${timeSpentInSeconds}s`;
      }, 1000);
    }
  },

  //Randomize order of the cards
  randomizeOrder() {
    cardsArr.map((card) => {
      let randomNumber = Math.floor(Math.random() * 20);
      card.style.order = randomNumber;
    });
  },

  flipCard(e) {
    e.target.classList.toggle("backSide");
    colorsMemoryGame.countClicks();
    colorsMemoryGame.setAndStartTimer();
    clickedCards.push(e.target.dataset.name);
    if (clickedCards.length == 2) {
      //prevent user from clicking more cards at the same time
      colorsMemoryGame.removeEventListenerFromCards();
      //Make it possible to click the visible cards again
      setTimeout(() => {
        colorsMemoryGame.addEventListenerToVisibleCards();
      }, 1000);
      //check if pair has found
      colorsMemoryGame.actionIfPair();
      colorsMemoryGame.actionIfNotPair();
    }
    if (pairsFound) {
      pairsFoundData.innerHTML = `${pairsFound.length / 2} of 9`;
    }
  },

  actionIfPair() {
    //check if pair
    if (
      clickedCards[0] === `${clickedCards[1]}2` ||
      clickedCards[1] === `${clickedCards[0]}2`
    ) {
      //handle if pair
      const card1 = document.querySelector(`[data-name=${clickedCards[0]}]`);
      const card2 = document.querySelector(`[data-name=${clickedCards[1]}]`);
      //prevent to click the cards again
      card1.removeEventListener("click", colorsMemoryGame.flipCard);
      card2.removeEventListener("click", colorsMemoryGame.flipCard);
      pairsFound.push(card1);
      pairsFound.push(card2);
      clickedCards = [];
      card1.classList.add("invisible");
      card2.classList.add("invisible");
      colorsMemoryGame.gameOverAction();
    }
  },
  actionIfNotPair() {
    //check if no pair found
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
  },
  //add event listener to the visible cards (method)
  addEventListenerToVisibleCards() {
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

  prepareGame() {
    colorsMemoryGame.randomizeOrder();
    colorsMemoryGame.addEventListenerToVisibleCards();
  },
};

colorsMemoryGame.prepareGame();
