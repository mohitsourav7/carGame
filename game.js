const score= document.querySelector('.score');
const startScreen= document.querySelector('.options');
const gameArea= document.querySelector('.boundries');
const car= document.querySelector('.car');
const myScore=document.querySelector('.myscore')
const startOpt=document.querySelector('.start')
// console.log(startScreen)
// let e= event;
let player={speed: 5, score:0}
let keys={
    ArrowUp:'false',
    ArrowDown:'false',
    ArrowRight:'false',
    ArrowLeft:'false'
};
// console.log(keys)
// console.log(player.speed)

// How to console user is pressing which key/
document.addEventListener("keydown",(e)=>{
    e.preventDefault()
    keys[e.key]="true";
    // console.log(e.key);
    // console.log(keys)
});
document.addEventListener("keyup",(e)=>{
    e.preventDefault()
    keys[e.key]="false";
    // console.log(e.key);
    // console.log(keys)
});

function isCollide(a,b){
    aRect= a.getBoundingClientRect();
    bRect= b.getBoundingClientRect();
    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right))
}

function moveEnemy(car){
    let enemy= document.querySelectorAll('.enemy');

    function endGame(){
        player.start=false;
        myScore.classList.remove("hide");
        startOpt.classList.add("hide")
        myScore.innerHTML="Your Final Score is:"+"  "+`${player.score+1}`
        startScreen.classList.remove('hide')
    }

    enemy.forEach(function(item) {

        if(isCollide(car,item)==true){
            console.log("Hit!!");
            endGame()
        }

       if(item.y>=750){
        item.y=-15;
        item.style.left= Math.floor(Math.random()*350 )+ "px"
       }

        item.y+=player.speed;
        item.style.top=item.y+"px";
    });
}

function moveLines(){
    let roadLines= document.querySelectorAll('.lines');

    roadLines.forEach(function(item) {

       if(item.y>=700){
        item.y-=750;
       }

        item.y+=player.speed;
        item.style.top=item.y+"px";
    });
}

 



function gamePlay(){
    // console.log("Hey i am clicked ")
    const car= document.querySelector('.car');
    const road=gameArea.getBoundingClientRect();
    // console.log(road)
    
    if(player.start){
        //   in road.top we have added value because it is margoin from top and we need car to not go all the way to top
        
        moveLines();
        moveEnemy(car);

        
        if(keys.ArrowUp=='true' && player.y>(road.top+170)){
            player.y-=player.speed
        };
        if(keys.ArrowDown=='true' && player.y<(road.bottom-90)){
            player.y+=player.speed
        };
        if(keys.ArrowLeft=='true' && player.x > 0){
            player.x-=player.speed
        };
        if(keys.ArrowRight=='true' && player.x<(road.width-50)){
            player.x+=player.speed
            // console.log(keys)
        };
        // console.log(keys)
        // Put all the condition in if with '=='

        car.style.top=player.y+"px";
        car.style.left=player.x+"px";
        // console.log();

        window.requestAnimationFrame(gamePlay)

        player.score++
        score.innerHTML = "SCORE:"+' '+player.score;
    }
}


 
function start(){

    player.start= true;
    // player.start=0;
    // gameArea.classList.remove('hide')==WE don't need this now as we are creating everything here only
    startScreen.classList.add('hide')
    gameArea.innerHTML=""
    player.score=0;

    // player.start=true;
    // window.requestAnimationFrame(gamePlay)
   
    
      //  How to add html element in JS  
    //apeendchild is used to add a child element inside a gameArea elememt  
    for(x=0;x<5;x++){
        let roadLines=document.createElement('div');
        roadLines.setAttribute('class','lines');
        roadLines.y=(x*150);
        roadLines.style.top=roadLines.y+"px";
        gameArea.appendChild(roadLines);  
    }

    let car= document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerText="Hey! i am a car";
    gameArea.appendChild(car);

    player.y= car.offsetTop;
    player.x= car.offsetLeft;
    // console.log(player.x +" "+ player.y)
    for(x=0;x<3;x++){
        let enemyCar=document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y=(x*150);
        enemyCar.style.top=enemyCar.y+"px";
        enemyCar.style.backgroundColor=randomColor();
        enemyCar.style.left= Math.floor(Math.random()*350 )+ "px"
        gameArea.appendChild(enemyCar);  
    }

//     console.log(y);
//     console.log(x);
// player.start=true;
window.requestAnimationFrame(gamePlay)
}
//  function randomColor(){
//     function c(){
//         let hex=Math.floor(Math.random()*256).toString(16);
//         return("0"+String(hex).substr(-2));
//     }

//     return "#"+c()+c()+c()
//  }
function randomColor(){
    function c(){
        let hex=Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}

document.addEventListener("DOMContentLoaded",function(){
    startScreen.addEventListener('click',start)
})