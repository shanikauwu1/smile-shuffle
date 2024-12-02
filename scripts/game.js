const gameBoard = document.querySelector(".game");
const resetBtn = document.querySelector(".reset");
const counterDiv = document.querySelector(".counter");
const NumberOfOpenBoxDiv = document.querySelector(".number-openBoxes");
let counter = 0;
const emoji1 = ["😧", "😴", "😗", "😍", "😮", "😵", "😩", "☹️"];
const emojis = [...emoji1, ...emoji1];
// Fisher-Yates shuffle to randomize the emojis array
function shuffleEmojis(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

shuffleEmojis(emojis); // Shuffle the emojis

let openBoxes = []; // Array to track currently opened boxes

// Generate the game board
for (let i = 0; i < emojis.length; i++) {
  const boxEmoji = document.createElement("div");
  boxEmoji.className = "item";
  boxEmoji.innerHTML = emojis[i];
  gameBoard.appendChild(boxEmoji);

  // Event listener for each box click
  boxEmoji.onclick = function () {
    counter += 1;
    counterDiv.innerHTML = counter;
    console.log(counter);
    if (
      openBoxes.length < 2 &&
      !boxEmoji.classList.contains("openBox") &&
      !boxEmoji.classList.contains("matchBoxes")
    ) {
      boxEmoji.classList.add("openBox");
      openBoxes.push(boxEmoji);

      if (openBoxes.length === 2) {
        // Check for a match after 500ms
        setTimeout(() => {
          if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
            openBoxes[0].classList.add("matchBoxes");
            openBoxes[1].classList.add("matchBoxes");
          } else {
            openBoxes[0].classList.remove("openBox");
            openBoxes[1].classList.remove("openBox");
          }
          openBoxes = []; // Reset openBoxes array

          // number of open boxes and update the div

          // Check if all boxes are matched
          if (
            document.querySelectorAll(".matchBoxes").length === emojis.length
          ) {
            loadFinalMessage();
          }

          NumberOfOpenBoxDiv.innerHTML =
            document.querySelectorAll(".matchBoxes").length;
        }, 500);
      }
    }
  };
}

// Reset the game when the reset button is clicked
resetBtn.addEventListener("click", () => {
  gameLoad();
});

function gameLoad() {
  // Reset the game state
  counter = 0;
  counterDiv.innerHTML = 0;
  NumberOfOpenBoxDiv.innerHTML = 0;
  openBoxes = [];
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.classList.remove("openBox", "matchBoxes");
    item.innerHTML = ""; // Clear the emoji
  });

  shuffleEmojis(emojis); // Re-shuffle the emojis
  // Re-populate the game board with shuffled emojis
  items.forEach((item, index) => {
    item.innerHTML = emojis[index];
  });
}

function loadFinalMessage() {
  modal.style.display = "block";
}

// popup box

// Get the modal and buttons
const modal = document.getElementById("popbox");
const closeModalBtn = document.getElementById("closeModalBtn");
const playAgainBtn = document.querySelector(".playAgain");

// play again button
playAgainBtn.addEventListener("click", function () {
  gameLoad();
  modal.style.display = "none";
});

// Close the modal
closeModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Close the modal if the user clicks outside of the modal content
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
