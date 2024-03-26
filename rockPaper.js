let score = JSON.parse(localStorage.getItem('score')) || {
    Wins: 0,
    Losses: 0,
    Ties: 0
};

updateScoreElement();
/*
if(!score){
    score = {
    Wins: 0,
    Losses: 0,
    Ties: 0,
    };
}
*/
    
let isAutoPlaying = false;
 let intervalId;

function autoPlay(){
    if(!isAutoPlaying){
    intervalId = setInterval(() =>{ 
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;

    }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
    }

    let resetDisplay = '';

    const html = `<p> Do yo want to reset the score? 
    <button class="yes"
    ">Yes</button> 
    <button class="no" 
    ">No</button></p>`;

    resetDisplay += html;

    const resetButton = () =>{
        score.Wins = 0;
        score.Losses = 0;
        score.Ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
    }

   let yes = document.querySelector('.yes');
    let no = document.querySelector('.no');

    document.querySelector('.js-rock-button').
    addEventListener('click', () => {
        playGame('rock');
    });
    
    document.querySelector('.js-paper-button').
    addEventListener('click', () => {
        playGame('paper')
    });

    document.querySelector('.js-scissors-button').
    addEventListener('click', () => {
            playGame('scissors');
    });

   let stop = document.querySelector('.stop-play');
    document.querySelector('.auto-play-button')
    .addEventListener('click', () => {
        autoPlay();
        if(stop.innerHTML === 'Auto Play'){
            stop.innerHTML = 'Stop Playing';
        }else{
            stop.innerHTML = 'Auto Play';
        }
    });

    let disp = document.querySelector('.disp');

        document.querySelector('.reset').   
        addEventListener('click', ()=>{
    document.querySelector('.display').innerHTML = resetDisplay;
    document.querySelector('.yes').
          addEventListener('click', () =>{
            resetButton();
           disp.innerHTML = '';
          }); 
          document.querySelector('.no').
            addEventListener('click', () =>{
                disp.innerHTML = '';
            });
        });

        document.body.addEventListener('keydown', (event) =>{
            if(event.key === 'r'){
                playGame('rock')
            }else if(event.key === 'p'){
                playGame('paper');
            }else if(event.key === 's'){
                playGame('scissors');
            }else if(event.key === 'a'){
                autoPlay();
            }
        });

       




function playGame(playerMove){
    const computerMove = pickComputerMove();

let result = '';

if(playerMove === 'scissors'){
    if(computerMove === 'rock'){
result = 'You lose';
}else if(computerMove === 'paper'){
result  = 'You win';
}else if(computerMove === 'scissors'){
result = 'You tie';
}       
}else if(playerMove === 'paper'){

if(computerMove === 'paper'){
    result = 'You tie';
}else if(computerMove === 'scissors'){
    result = 'You lose';
}else if(computerMove === 'rock'){
    result = 'You win';
}


}else if(playerMove === 'rock'){
    if(computerMove === 'rock'){
result = 'You tie';
}else if(computerMove === 'paper'){
result = 'You win';
}else if(computerMove === 'scissors'){
result = 'You lose';
}

}
if(result === 'You win'){
    score.Wins+=1;
}else if(result === 'You lose'){
    score.Losses+=1
}else if(result === 'You tie'){
    score.Ties+=1;
}
localStorage.setItem('score',JSON.stringify(score));

updateScoreElement();


document.querySelector('.js-result').innerHTML = `${result}`;




document.querySelector('.js-moves').innerHTML = ` You 
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`



console.log(computerMove);


}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML =` Wins:${score.Wins}, Losses:${score.Losses}, Ties:${score.Ties}`

}

function pickComputerMove(){
    const randomNumber = Math.random();
    let computerMove = '';

if(randomNumber >= 0 && randomNumber < 1/3){
computerMove = 'rock';
}else if(randomNumber >= 1/3 && randomNumber < 2/3){
computerMove = 'paper';
}else if(randomNumber >= 2/3 && randomNumber < 1){
computerMove = 'scissors';
}
return computerMove;

}

