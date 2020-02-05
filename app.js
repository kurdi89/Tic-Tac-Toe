const choices = document.querySelectorAll('.line')

let player1 = 'X';
let player2 = 'O';
let x_score = 0;
let o_score = 0;
let round = 1;

const xe = document.getElementById('x_score')
const oe = document.getElementById('o_score')
const re = document.getElementById('round')
xe.innerHTML = x_score
oe.innerHTML = o_score
re.innerHTML = round


let currentPlayer = player1
const cleanSet = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
]
var tic_tac_toe = cleanSet;
console.log(tic_tac_toe)


//

// handling toasts :
var options = {
  animation : true,
  autohide : true,
  delay : 2000
}
$('.toast').toast(options)
const toastBody = document.getElementById('toast-body')

const fristPlayer = async function (choices) {
  if (currentPlayer == player1) {
    // assign the values :
    assignValues(currentPlayer, choices.toElement.dataset)
    currentPlayer = player2
    this.textContent += player1
    // player1 = 0;
    this.removeEventListener('click', fristPlayer)
    for (i = 0; i <= choices.length; i++) {
      if (choices[i].textContent.includes(player1)) {
        player1++
      }
    }
  } else if (currentPlayer == player2) {
    // assign the values :
    assignValues(currentPlayer, choices.toElement.dataset)
    currentPlayer = player1

    this.textContent += player2
    // player2 = 0;
    this.removeEventListener('click', fristPlayer)
    for (i = 0; i <= choices.length; i++) {
      if (choices[i].textContent.includes(player1)) {
        playe2++
      }
    }
  }
  // check if a user won or the game finished :
  validateWinning()
  // check if ended : 
  checkDone()
}


for (let i = 0; i < choices.length; i++) {
  choices[i].addEventListener('click', fristPlayer)
}


/**  
 * callbacks :
 */
// callback 1) add values to the Main array (tic_tac_toe):
function assignValues(currentPlayer, location){
    var row = location.row - 1; // shift to match the array (arrays start at 0 not 1)
    var col = location.col - 1;
    var choice = currentPlayer;
    console.log('choice is :', currentPlayer, 'location :', {row , col})
    // now update the main array : 
    tic_tac_toe[row][col] = choice;
}

// callback 2) check for wining : 
function validateWinning(){
    console.log('record is :', tic_tac_toe)
    var _ = tic_tac_toe;
    // check for rows :
    _.forEach((row, index, array)=>{
        var rowVals = []
        row.forEach(e => rowVals.push(e))
        console.log(rowVals)
        var win =  rowVals.every( (val, i, arr) => val === arr[0] &&  val != ' ');
        console.log('win ? ', win)
        // if win == true, announce winner :
        if(win) announceWinner(rowVals, 'rows', index, array)
    })

    // check for columns : 
    // first transpose the array (transposed array is the same as the normal array but rows are cols and cols are rows):
    var _  = tic_tac_toe[0].map((col, i) => tic_tac_toe.map(row => row[i])); // this is the transposed array
    _.forEach((row, index, array)=>{
        var colVals = []
        row.forEach(e => colVals.push(e))
        console.log(colVals)
        var win =  colVals.every( (val, i, arr) => val === arr[0] &&  val != ' ');
        console.log('win ? ', win)
        // if win == true, announce winner :
        if(win) announceWinner(colVals, 'cols', index, array)
    })

    // check for diagonal winning (two digonals): 
    // if array[0][0] [1][1] [2][2] or array[0][2] [1][1] [2][0]
    var _ = tic_tac_toe;
    var d_one = [_[0][0], _[1][1], _[2][2]]
    var d_two = [_[0][2], _[1][1], _[2][0]]
    var diagonals = [d_one, d_two]
    diagonals.forEach((d, index, array)=>{
        var win =  d.every( (val, i, arr) => val === arr[0] &&  val != ' ');
        console.log('win ? ', win)
        // if win == true, announce winner :
        if(win) announceWinner(d, 'diagonal', index, array)
    })

}

// callback 3) announce winner : 
function  announceWinner(row, how, index, array){
    let winner = row[0].trim().toLowerCase();
    console.log('winner is : ', winner)
    console.log(row, how, index, array)
    if(how == 'rows'){
        var index = index + 1; // to shift
        document.querySelectorAll('[data-row="'+ index +'"]').forEach(e => { applyStyle(e, winner)} )
    }
    if(how == 'cols'){
        var index = index + 1; // to shift
        document.querySelectorAll('[data-col="'+ index +'"]').forEach(e => { applyStyle(e, winner)} )
    }
    if(how == 'diagonal'){
        if(index == 0){
            // digonal one : 
            var elements = [document.querySelectorAll('[data-row="1"][data-col="1"], [data-row="2"][data-col="2"], [data-row="3"][data-col="3"]')]
            console.log('elements', elements)
            elements[0].forEach(e => { applyStyle(e, winner)} )
        }
        if(index == 1){
            // digonal two : 
            var elements = [document.querySelectorAll('[data-row="1"][data-col="3"], [data-row="2"][data-col="2"], [data-row="3"][data-col="1"]')]
            console.log('elements', elements)
            elements[0].forEach(e => { applyStyle(e, winner)} )
        }
    }

    // call new round : 
    newRound(winner)
    console.log('round : ', round)
    console.log('tic_tac_toe : ', tic_tac_toe)
}

// callback 4) apply style to the elements (a function that takes the winning elements and apply styles for them): 
function applyStyle(element, winner){
  console.log('winner : ', winner.trim().toLowerCase())
  if(winner.trim().toLowerCase() === "x") {
    element.style.color="white"; element.style.background="#DF691A";
    // toast : 
    toastBody.classList.remove('text-success');    
    toastBody.classList.add('text-primary');    
    toastBody.textContent = 'Congratulations, One point for Player 1'  
    $('#toast').toast('show');
  }
  if(winner.trim().toLowerCase() === "o") {
    element.style.color="white"; element.style.background="#5cb85c"
    // toast : 
    toastBody.classList.remove('text-primary');    
    toastBody.classList.add('text-success');    
    toastBody.textContent = 'Congratulations, One point for Player 2'  
    $('#toast').toast('show');
  }
}

// callback 5) check if the game is done (this function is to be called after every play): 
// tic_tac_toe.flat
function checkDone(){
    var _ = tic_tac_toe.flat(); // this flatten the array of arrays to a single array
    // check if all the elements are not equal to '' or ' '
    console.log('flat :', _)
    var done = !_.includes(' '); // if the main array still include ' ' empty elements in it
    // if done == true : 
    if(done) {
        // endGame();
        newRound(winner=false);
        console.log('the round is ended with no winners')
    }
}

// callback 6) end the game :
function endGame(){
    // renew the game :
    console.log('The game will renew autotmaticly in 1 seconds')
    // renewGame();
}

// renew the game : 
function renewGame(){
    // wait for 1.0 seconds then renew the game : 
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}


// new round : 
function newRound(winner){
  if(winner){
    // if there is a winner : 
    // for winners :
    if(winner == 'x'){
      x_score++;
      xe.innerHTML = x_score;
      round++;
    }
    if(winner == 'o'){
      o_score++;
      oe.innerHTML = o_score;
      round++;
    }
    re.innerHTML = round;
  }else{
    $('#tie').modal('show');
    round++;
    re.innerHTML = round;
  }
  // clean set :
  tic_tac_toe = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
  // style clean setup : (needs a wait to be visiable) :
  setTimeout(() => {
    choices.forEach((e)=>{
      e.textContent = "";
      e.style.color="#607d8b";
      e.style.background="white";
    })
    // re-attach the event listeners : 
    for (let i = 0; i < choices.length; i++) {
      choices[i].addEventListener('click', fristPlayer)
    }
  }, 2000);
  // remove the event listeners (to avoid clicking after a win the events should be added after 2 secondes according to the function above): 
  for (let i = 0; i < choices.length; i++) {
    choices[i].removeEventListener('click', fristPlayer)
  }
}
// attach an event listener to the play again button and call the end game function
document.getElementById('again').addEventListener('click', renewGame)





// const choices = document.querySelectorAll('.line')
// let player1 = 'X'
// let player2 = 'O'
// let x_score = 0;
// let o_score = 0;
// let isWin = false;
// let currentPlayer = player1
// const cleanSet = [
//   [' ', ' ', ' '],
//   [' ', ' ', ' '],
//   [' ', ' ', ' ']
// ]
// var tic_tac_toe = cleanSet;
// console.log(tic_tac_toe)

// const fristPlayer = async function (choices) {
//   // if true then its player 1 true

//   if (currentPlayer == player1) {
//     // assign the values :
//     assignValues(currentPlayer, choices.toElement.dataset)
//     currentPlayer = player2
//     this.textContent += player1
//     // player1 = 0;
//     this.removeEventListener('click', fristPlayer)
//     for (i = 0; i <= choices.length; i++) {
//       if (choices[i].textContent.includes(player1)) {
//         player1++
//       }
//     }
//   } else if (currentPlayer == player2) {
//     // assign the values :
//     assignValues(currentPlayer, choices.toElement.dataset)
//     currentPlayer = player1

//     this.textContent += player2
//     // player2 = 0;
//     this.removeEventListener('click', fristPlayer)
//     for (i = 0; i <= choices.length; i++) {
//       if (choices[i].textContent.includes(player1)) {
//         playe2++
//       }
//     }
//   }
//   // check if a user won or the game finished :
//   await validateWinning()
//   // check if ended : 
//   await checkDone()

// }


// for (let i = 0; i < choices.length; i++) {
//   choices[i].addEventListener('click', fristPlayer);
//   choices[i].addEventListener('click', fristPlayer);
// }


// /**  
//  * callbacks :
//  */
// // callback 1) add values to the Main array (tic_tac_toe):
// function assignValues(currentPlayer, location){
//     var row = location.row - 1; // shift to match the array (arrays start at 0 not 1)
//     var col = location.col - 1;
//     var choice = currentPlayer;
//     console.log('choice is :', currentPlayer, 'location :', {row , col})
//     // now update the main array : 
//     tic_tac_toe[row][col] = choice;
// }

// // callback 2) check for wining : 
// function validateWinning(){
//   // userWon=f
//     console.log('record is :', tic_tac_toe)
//     var _ = tic_tac_toe;
//     // check for rows :
//     _.forEach((row, index, array)=>{
//         var rowVals = []
//         row.forEach(e => rowVals.push(e))
//         console.log(rowVals)
//         var win =  rowVals.every( (val, i, arr) => val === arr[0] &&  val != ' ');
//         console.log('win ? ', win)
//         // if win == true, announce winner :
//         if(win) 
//         announceWinner(rowVals, 'rows', index, array)
      
//     })

//     // check for columns : 
//     // first transpose the array (transposed array is the same as the normal array but rows are cols and cols are rows):
//     var _  = tic_tac_toe[0].map((col, i) => tic_tac_toe.map(row => row[i])); // this is the transposed array
//     _.forEach((row, index, array)=>{
//         var colVals = []
//         row.forEach(e => colVals.push(e))
//         console.log(colVals)
//         var win =  colVals.every( (val, i, arr) => val === arr[0] &&  val != ' ');
//         console.log('win ? ', win)
//         // if win == true, announce winner :
//         if(win) announceWinner(colVals, 'cols', index, array)
//     })

//     // check for diagonal winning (two digonals): 
//     // if array[0][0] [1][1] [2][2] or array[0][2] [1][1] [2][0]
//     var _ = tic_tac_toe;
//     var d_one = [_[0][0], _[1][1], _[2][2]]
//     var d_two = [_[0][2], _[1][1], _[2][0]]
//     var diagonals = [d_one, d_two]
//     diagonals.forEach((d, index, array)=>{
//         var win =  d.every( (val, i, arr) => val === arr[0] &&  val != ' ');
//         console.log('win ? ', win)
//         // if win == true, announce winner :
//         if(win) announceWinner(d, 'diagonal', index, array)
//     })
// }

// // callback 3) announce winner : 
// function announceWinner(row, how, index, array){
 
//     let winner = row[0].trim().toLowerCase();
//     console.log('winner is : ', winner)
//     let userWon = false;
//     console.log(row, how, index, array)
//     if(how == 'rows'){
//         var index = index + 1; // to shift
//         document.querySelectorAll('[data-row="'+ index +'"]').forEach(e => { applyStyle(e, winner)} )
//         userWon = true;
     
//     }
//     if(how == 'cols'){
//         var index = index + 1; // to shift
//         document.querySelectorAll('[data-col="'+ index +'"]').forEach(e => { applyStyle(e, winner)} )
//         userWon = true;
//     }
//     if(how == 'diagonal'){
//         if(index == 0){
//             // digonal one : 
//             var elements = [document.querySelectorAll('[data-row="1"][data-col="1"], [data-row="2"][data-col="2"], [data-row="3"][data-col="3"]')]
//             console.log('elements', elements)
//             elements[0].forEach(e => { applyStyle(e, winner)} )
//             userWon = true;
//         }
//         if(index == 1){
//             // digonal two : 
//             var elements = [document.querySelectorAll('[data-row="1"][data-col="3"], [data-row="2"][data-col="2"], [data-row="3"][data-col="1"]')]
//             console.log('elements', elements)
//             elements[0].forEach(e => { applyStyle(e, winner)} )
//             userWon = true;
//         }
//     }
//     if(userWon) {
//       // alert('we have a winner');
//       // modal 
//     } else {
//       // console.log('user not won 1')
//       // if (tic_tac_toe.flat().includes(' ') === false) {
//       //   console.log('user not won 2')
//       //   alert('tie')
//       // }
//     }
//     removeEvent(); 
// }

// // callback 4) apply style to the elements (a function that takes the winning elements and apply styles for them): 
// function applyStyle(element, winner){
//     console.log('winner : ', winner.trim().toLowerCase())
//     if(winner.trim().toLowerCase() === "x") {
//       element.style.color="white"; element.style.background="#DF691A";
//     }
//     if(winner.trim().toLowerCase() === "o") {
//       element.style.color="white"; element.style.background="#5cb85c"
//     }
// }

// // callback 5) check if the game is done (this function is to be called after every play): 
// // tic_tac_toe.flat
// function checkDone(){
//     var _ = tic_tac_toe.flat(); // this flatten the array of arrays to a single array
//     removeEventListener('click', fristPlayer)
//     // check if all the elements are not equal to '' or ' '
//     console.log('flat :', _)
//     var done = !_.includes(' '); // if the main array still include ' ' empty elements in it
//     // if done == true : 

//     if(done) {

//       console.log('the game is ended with no winners')
//       alert('Game over,tie')
//       endGame();
//     }
// }

// // callback 6) end the game :
// function endGame(){
//     // renew the game :
//     console.log('The game will renew autotmaticly in 1 seconds')
//     renewGame();
// }

// // renew the game : 
// function renewGame(){
//     // wait for 1.0 seconds then renew the game : 
//     setTimeout(() => {
//         window.location.reload();
//     }, 2000);
// }

// function removeEvent (){
//   for (let i = 0; i < choices.length; i++) {
//     choices[i].removeEventListener('click', fristPlayer);
// }}

// // attach an event listener to the play again button and call the end game function
// document.getElementById('again').addEventListener('click', endGame)
