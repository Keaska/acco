let tacoTriggered = false;
const tacos = 'tacos';
const letter = 'e';
const easy = 50;
const normal = 100;
const hard = 1000;
let score = 0;
let winNum = null;
let currentDifficulty = null;

$('#start').show();
$('#tryagain').hide();

$('#game').hide();
$('#tacoTime').hide();

$('#easy1').hide();
$('normal1').hide();
$('#hard1').hide();

function tryAgain() {
  $('#tryagain').hide();
  $('#start').show();
  resetNumber();
}
function easy1() {
  $('#easy1').show();
  $('#normal1').hide();
  $('#hard1').hide();
}
function normal1() {
  $('#normal1').show();
  $('#easy1').hide();
  $('#hard1').hide();
}
function hard1() {
  $('#hard1').show();
  $('#easy1').hide();
  $('#normal1').hide();
}

function initGame() {
  const userInput = $('#seldif').val();
  const userInputLowerCase = userInput.toLowerCase();
  console.log(userInput);
  $('#seldif').val('');
  if (userInputLowerCase === 'easy') {
    currentDifficulty = easy;
    easy1();
  } else if (userInputLowerCase === 'normal') {
    currentDifficulty = normal;
    normal1();
  } else if (userInputLowerCase === 'hard') {
    currentDifficulty = hard;
    hard1();
  } else {
    $('#difError').html('Invalid Difficulty');
    $('#seldif').focus();
    return;
  }
  $('#game').show();
  $('#mainMenu').hide();
  resetNumber();
}

function setOutputColor(color) {
  $('#outPut').css('color', color);
}
function setOutputHtml(result) {
  $('#outPut').html(result);
}
function numGen() { // generates number
  const ranGen = Math.random();
  const numMulti = ranGen * currentDifficulty;
  const numRnd = Math.round(numMulti);
  console.log('this is the answer');
  console.log(numRnd);
  return numRnd;
}
function menu() {
  $('#game').hide();
  $('#mainMenu').show();    
  $('#tacoTime').hide()
}

function resetNumber() {
  winNum = numGen();
  setOutputHtml('');
  $('#box').val('');
  score = 0;
  $('#scoreElm').html(score);
  tacoTriggered = false;
  $('#box').focus();
  $('#tacoTime').hide()
}
function run() { // check if input is correct
  const userInput = $('#box').val(); // grabs input value of input box
  $('#box').val(''); // clears box

  if (userInput === '') {
    console.log('troll'); // i like big male chickens and i cannot lie
  } else {
    score += 1;

    if (userInput > winNum) {
      setOutputHtml('Too high');
      setOutputColor('red'); // lose text color
    } else if (userInput === tacos) {
      if (tacoTriggered === false) {
        $('#tacoTime').show();
        setOutputColor('red');
        console.log('big tacos');
        score -= 2;
        tacoTriggered = true; 
      }
    } else if (userInput < winNum) {
      setOutputHtml('Too low.');
      setOutputColor('red');
    } else if (userInput === winNum) {
      setOutputHtml('You win. Heres a cookie');
      setOutputColor('green'); // win text color
      winNum = numGen();
      $('#tryagain').show();
      $('#start').hide();
    } else {
      setOutputHtml('Invalid');
      setOutputColor('green');
    }
  }
  $('#scoreElm').html(score);
}
$('#box').on('keypress', (e) => {
  if (e.which === 13) {
    run();
  }
});
$('#seldif').on('keypress', (e) => {
  if (e.which === 13) {
    initGame();
  }
});
