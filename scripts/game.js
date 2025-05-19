// Shanika ekanayake
// Final project- extra features

class SmileyGame {
  constructor() {
    // Variables declaration
    this.gameBoard = document.querySelector(".game");
    this.resetBtn = document.querySelector(".reset");
    this.counterDiv = document.querySelector(".counter");
    this.NumberOfOpenBoxDiv = document.querySelector(".number-openBoxes");
    this.modal = document.getElementById("popbox");
    this.playAgainBtn = document.querySelector(".playAgain");
    this.startBtn = document.querySelector(".Start");
    this.quitBtn = document.querySelector(".quit");
    this.levelBtnDiv = document.querySelector(".levelBtn");
    this.levelBtn = document.querySelectorAll(".levelSelectBtn");

    this.counter = 0;
    this.openBoxes = [];

    this.easyEmoji = [
      ...["😧", "😴", "😗", "😍", "😮", "😵", "😩", "☹️"],
      ...["😧", "😴", "😗", "😍", "😮", "😵", "😩", "☹️"],
    ];

    this.hardEmojis = [
      ...["😧", "😴", "😗", "😍", "😮", "😵", "😩", "☹️", "😁", "😅"],
      ...["😧", "😴", "😗", "😍", "😮", "😵", "😩", "☹️", "😁", "😅"],
    ];

    this.items = [];

    // Initialize event listeners
    this.addEventListeners();

    // Show the initial modal
    this.modal.style.display = "block";
    this.playAgainBtn.style.display = "none";
    this.levelBtnDiv.style.display = "none";
  }
  // select the level
  loadLevelSection() {
    this.startBtn.style.display = "none";
    this.levelBtnDiv.style.display = "flex";
    document.querySelector(".modal-content h2").innerHTML = "Select the level";
  }
  selectLevel(level) {
    this.level = level;
    if (this.level == "easy") {
      this.emojis = this.easyEmoji;
      this.gameBoard.classList.add("game-easy");
    } else {
      this.emojis = this.hardEmojis;
      this.gameBoard.classList.add("game-hard");
    }

    //console.log(this.emojis);
  }
  // Initialize the game
  startGame() {
    this.modal.style.display = "none";
    this.counter = 0;
    this.counterDiv.innerHTML = 0;
    this.NumberOfOpenBoxDiv.innerHTML = 0;
    this.openBoxes = [];

    this.shuffleEmojis(this.emojis);
    this.renderGameBoard();
    this.bgSounds();
  }

  // Reset the game
  resetGame() {
    this.startGame();
  }

  // Shuffle the emojis
  shuffleEmojis(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  // Render the game board with emojis
  renderGameBoard() {
    // Clear previous board
    this.gameBoard.innerHTML = "";

    this.emojis.forEach((emoji, i) => {
      const boxEmoji = document.createElement("div");
      boxEmoji.className = "item";
      boxEmoji.innerHTML = emoji;
      this.gameBoard.appendChild(boxEmoji);
      this.items.push(boxEmoji);

      boxEmoji.addEventListener("click", () => this.onBoxClick(boxEmoji));
    });
  }

  // Event listener for box clicks
  onBoxClick(boxEmoji) {
    if (
      this.openBoxes.length < 2 &&
      !boxEmoji.classList.contains("openBox") &&
      !boxEmoji.classList.contains("matchBoxes")
    ) {
      this.MouseSound();
      boxEmoji.classList.add("openBox");
      this.openBoxes.push(boxEmoji);

      if (this.openBoxes.length === 2) {
        setTimeout(() => this.checkMatch(), 500);
      }

      this.counter += 1;
      this.counterDiv.innerHTML = this.counter;
    }
  }

  // Check if two open boxes match
  checkMatch() {
    const [firstBox, secondBox] = this.openBoxes;

    if (firstBox.innerHTML === secondBox.innerHTML) {
      firstBox.classList.add("matchBoxes");
      secondBox.classList.add("matchBoxes");
    } else {
      firstBox.classList.remove("openBox");
      secondBox.classList.remove("openBox");
    }

    this.openBoxes = [];
    this.NumberOfOpenBoxDiv.innerHTML =
      document.querySelectorAll(".matchBoxes").length;

    if (
      document.querySelectorAll(".matchBoxes").length === this.emojis.length
    ) {
      this.loadFinalMessage();
    }
  }

  // Display the final win message
  loadFinalMessage() {
    this.modal.style.display = "block";
    this.startBtn.style.display = "none";
    this.playAgainBtn.style.display = "block";
    this.levelBtnDiv.style.display = "none";
    document.querySelector(".modal-content h2").innerHTML =
      "Congratulations!<br /> you win";
  }

  // Play mouse click sound
  MouseSound() {
    const fileUrl = "media/click-47609.mp3";
    const audio = new Audio(fileUrl);
    audio.play();
  }

  // Play background sound
  bgSounds() {
    const fileUrl =
      "media/the-funny-bunch-giulio-fazio-main-version-02-28-16840.mp3";
    const audio = new Audio(fileUrl);
    audio.play();
  }

  // Event listeners for buttons
  addEventListeners() {
    this.startBtn.addEventListener("click", () => this.loadLevelSection());
    // this.levelBtn.addEventListener("click", () => this.startGame());

    this.levelBtn.forEach((button) => {
      button.addEventListener("click", (event) => {
        this.level = event.target.getAttribute("data-level");
        // console.log(this.level);
        this.selectLevel(this.level);
        this.startGame();
      });
    });

    this.resetBtn.addEventListener("click", () => this.resetGame());
    this.quitBtn.addEventListener("click", () => location.reload());
    this.playAgainBtn.addEventListener("click", () => location.reload());
  }
}

// Initialize the game
const game = new SmileyGame();
