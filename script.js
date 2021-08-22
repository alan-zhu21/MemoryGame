const gameContainer = document.getElementById("game");
const startBtn = document.getElementById('startbtn');
const restartBtn = document.getElementById('restartbtn');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter]; // temp = purple
    array[counter] = array[index]; // array[-1] = array[random] === *random color*
    array[index] = temp; // for that random color's index, set it equal to temp *purple*
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
let numCardsFlipped = 0;
const flippedCards = [];
const allMatchedColors = [];

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let divPosition = 1;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // set unique id for each div
    newDiv.id = divPosition;
    divPosition++;

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log(flippedCards);
  console.log(numCardsFlipped);
  // console.dir(event.target);
  // console.log(event.target.id);
  if (numCardsFlipped < 2) {
    if (!flippedCards.includes(event.target)) {
      event.target.style.backgroundColor = event.target.className;
      flippedCards.push(event.target);
      numCardsFlipped++;
    }
  }
  if (numCardsFlipped === 2) {
    if (flippedCards[0].style.backgroundColor === flippedCards[1].style.backgroundColor
      && flippedCards[0].id !== flippedCards[1].id) {
      allMatchedColors.push(event.target.style.backgroundColor);
      flippedCards.length = 0;
      numCardsFlipped = 0;
      // console.log('went thru path A')
    }
  }
  if (numCardsFlipped >= 2) {
    if (flippedCards[0].style.backgroundColor !== flippedCards[1].style.backgroundColor) {
      flippedCards.length = 0;
      setTimeout(function () {
        for (let div of gameContainer.children) {
          if (!allMatchedColors.includes(div.style.backgroundColor)) {
            div.style.backgroundColor = '';
          }
        }
        numCardsFlipped = 0;
        // console.log('went thru path B')
      }, 1000)
    }
  }
}

// when the DOM loads
startBtn.addEventListener('click', function (event) {
  console.dir(event);
  if (startBtn.isGameOnDisplay !== true) {
    createDivsForColors(shuffledColors);
    startBtn.isGameOnDisplay = true;
    startBtn.isGameComplete = true;
  }
});

restartBtn.addEventListener('click', function (event) {
  console.dir(event);
  for (let matchedColor in allMatchedColors) {
    if (!COLORS.includes(matchedColor)) {
      startBtn.isGameComplete = false;
    }
  }
  if (startBtn.isGameComplete === true && startBtn.isGameOnDisplay === true) {
    gameContainer.innerHTML = '';
    shuffle(COLORS);
    createDivsForColors(shuffledColors);
  }
})