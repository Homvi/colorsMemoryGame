let cardsList = document.getElementsByClassName("card");
let cardsArr = Array. from(cardsList)
let clickedCards = [];

//randomize order
cardsArr.map(card => {
    let randomNumber = Math.floor(Math.random()* 20) 
    card.style.order = randomNumber
})

let flipCard = (e) => {

e.target.classList.toggle("backSide")
console.log(`The clicked card is: ${e.target.dataset.name}`);
clickedCards.push(e.target.dataset.name)
console.log(`Clicked cards: ${clickedCards}`);

//Alert if you found a pair
if(clickedCards[0] == `${clickedCards[1]}2` || clickedCards[1] == `${clickedCards[0]}2`)
console.log("You have found a pair!");
}

let addEventListenerToCards = () => {
    cardsArr.map(card => {
    card.addEventListener("click", flipCard)
    })
}

addEventListenerToCards()


