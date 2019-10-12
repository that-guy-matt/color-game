//######## VARIABLE DEFINITIONS ###########

var colors = [];
var diff = 6;
var pickedColor = pickColor();
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetBtn = document.querySelector("#new");
var modeBtns = document.querySelectorAll(".mode");
var h1 = document.querySelector("h1");

init();

//############ FUNCTION DEFINITIONS ###############

//initializing function... this starts the gamne.
function init(){
  setupButtonListeners();
  newGame();
}

//set up button functionality
function setupButtonListeners(){
  //new game button functionality
  resetBtn.addEventListener("click", function(){
    newGame();
  });

  //difficulty button functionality
  for(var i = 0; i < modeBtns.length; i++){
    modeBtns[i].addEventListener("click", function(){
      //remove .selected class from all mode buttons first
      for(var j=0; j<modeBtns.length; j++){
        modeBtns[j].classList.remove("selected");
      }
      //then add .selected class only to clicked button
      this.classList.add("selected");
      this.textContent === "Easy" ? diff = 3: diff = 6;
      newGame()
    });
  }
}

//function changes colors of squares
function changeSquareColors(color) {
  for(var i = 0; i < squares.length; i++){
    //change color to match given color
    squares[i].style.backgroundColor = color;
  }
}

//function changes colors of buttons
function changeButtonColors(color){
  for(var i = 0; i < modeBtns.length; i++){
    if(modeBtns[i].classList.contains("selected")){
      modeBtns[i].style.backgroundColor = color;
    } // ######## TO DO ##########
      // add else statement maybe to add
      //mouseEnter/mouseLeave effects
  }
  // ######## TO DO ##########
  // add mouseEnter/mouseLeave events for reset button
}

//chooses the winning color
function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

//takes a number (amount of squares)
//produces an array of random colors with a length of input
function generateRandomColors(num){
  //make array
  var arr = []
  //add num random colors to array
  for(var i = 0; i < num; i++){
    //get random color and push into array
    arr.push(randomColor());
  }
  //return array
  return arr;
}

//function to produce a single color with random rgb values
function randomColor(){
  //pick a red from 0-255
  var r = Math.floor(Math.random()*256);
  //pick green from 0-255
  var g = Math.floor(Math.random()*256);
  //pick blue from 0-255
  var b = Math.floor(Math.random()*256);
  return("rgb(" + r + ", " + g + ", " + b + ")");
}

//function sets up the game
function gameStart() {
  for(var i = 0; i < squares.length; i++){
    //add initial colors to squares
    if(colors[i]){
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "block";
    } else {
      squares[i].style.display = "none";
    }
    //add click listeners to squares
    squares[i].addEventListener("click", function(){
      //grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      //compare color to pickedColor
      if(clickedColor === pickedColor){
        messageDisplay.textContent = "Correct!";
        resetBtn.textContent = "Play Again?"
        changeSquareColors(clickedColor);
        //this isn't working
        //changeButtonColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try again";
      }
    });
  }
}

//function resets the game and starts new game
function newGame() {
  h1.style.backgroundColor = "steelblue";
  resetBtn.textContent = "New Colors"
  messageDisplay.textContent = "";
  colors = generateRandomColors(diff);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  gameStart();
}
