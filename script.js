const score =
  /* JSON.parse(localStorage.getItem("score")) || */
  {
    Wins: 0,
    Losses: 0,
    Ties: 0,
  };

updateScoreElement();

document.getElementById("rock").addEventListener("click", () => {
  playGame("rock");
});
document.getElementById("paper").addEventListener("click", () => {
  playGame("paper");
});
document.getElementById("scissors").addEventListener("click", () => {
  playGame("scissors");
});

function pickComputerMove() {
  let computerMove;
  let randomNum = Math.random();
  if (randomNum > 0 && randomNum <= 1 / 3) {
    computerMove = "rock";
  } else if (randomNum > 1 / 3 && randomNum <= 2 / 3) {
    computerMove = "paper";
  } else if (randomNum > 2 / 3 && randomNum <= 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function playGame(playerMove) {
  let result = "";
  const computerMove = pickComputerMove();

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "Lose";
    } else if (computerMove === "scissors") {
      result = "Win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "Win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "Lose";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "Lose";
    } else if (computerMove === "paper") {
      result = "Win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  }

  if (result === "Win") {
    score.Wins++;
    document.querySelector(".result").innerHTML = `You ${result}.`;
  } else if (result === "Lose") {
    score.Losses++;
    document.querySelector(".result").innerHTML = `You ${result}.`;
  } else if (result === "Tie") {
    score.Ties++;
    document.querySelector(".result").innerHTML = `${result}.`;
  }

  let playerIcon = updateIcon(playerMove);
  console.log(playerMove);
  const displayPlayerIcon = document.createElement("button");
  displayPlayerIcon.innerHTML = `<i  class="small-icon fa-solid fa-${playerIcon} fa-lg" style="color: #f9a20b;"></i>`;

  let computerIcon = updateIcon(computerMove);
  const displayComputerIcon = document.createElement("button");
  displayComputerIcon.innerHTML = `<i class="small-icon fa-solid fa-${computerIcon} fa-lg" style="color: #f9a20b;"></i>`;

  function updateIcon(whoPlaying) {
    if (whoPlaying === "rock") {
      whoPlaying = "hand-fist";
    } else if (whoPlaying === "paper") {
      whoPlaying = "hand";
    } else if (whoPlaying === "scissors") {
      whoPlaying = "hand-scissors fa-rotate-90";
    }
    return whoPlaying;
  }

  document.querySelector(
    ".display-moves"
  ).innerHTML = `You ${displayPlayerIcon.innerHTML} - ${displayComputerIcon.innerHTML} Computer`;

  document.querySelector(
    ".score"
  ).innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;

  /* localStorage.setItem("score", JSON.stringify(score)); */
}

document.querySelector(".reset-btn").addEventListener("click", () => {
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;
  document.querySelector(
    ".score"
  ).innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
  autoPlay(isAutoPlaying);
});

function updateScoreElement() {
  document.querySelector(
    ".score"
  ).innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".auto-play").innerHTML = "Stop Autoplay";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".auto-play").innerHTML = "Auto Play";
  }
}
document.querySelector(".auto-play").addEventListener("click", () => {
  autoPlay();
});
