'use strict';

let magicNumber = generateMagicNumber();
console.log(magicNumber);
let score = 0;
let highScore = 0;
setInitialScores();

// play again
document.querySelector('.again').addEventListener('click', playAgain);

// play
document.querySelector('.check').addEventListener('click', play);

// utils functions
function generateMagicNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function isGameLost() {
  return score <= 0;
}

function handleLostGame() {
  displayMessage('You lost the GAME');
  score = 0;
}

function handleWinGame() {
  document.querySelector('.number').textContent = magicNumber;
  document.querySelector('body').style.backgroundColor = '#60b347';
  displayMessage('Congratulations! Number Matched');
  ++score;
  if (score > highScore) {
    recordHighScore(score);
  }
  document.querySelector('.check').disabled = 'true';
}

function play() {
  const getInputNum = Number(document.querySelector('.guess').value);
  if (getInputNum == '' || getInputNum === null) {
    alert('Please enter valid value');
  } else if (getInputNum === magicNumber) {
    handleWinGame();
  } else if (getInputNum !== magicNumber) {
    if (!isGameLost()) {
      getInputNum < magicNumber
        ? displayMessage('Number is too low ):')
        : displayMessage('Number is too high ):');
      --score;
    } else {
      handleLostGame();
    }
  }
  document.querySelector('.score').textContent = score;
}

function recordHighScore(maxScore) {
  highScore = maxScore;
  document.querySelector('.highscore').textContent = highScore;
}

function setInitialScores() {
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.highscore').textContent = highScore;
}

function playAgain() {
  document.querySelector('.check').removeAttribute('disabled');
  magicNumber = generateMagicNumber();
  console.log(magicNumber);
  setInitialScores();
  document.querySelector('body').style.backgroundColor = '#222';
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}
