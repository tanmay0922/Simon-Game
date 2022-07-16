var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
 
var started =false;
var level=0;
//jquery used:
$(document).keypress(function(){  //keyboard press
    if(!started) {
        //Title
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});
 
$(".btn").click(function() {
    
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});
//checking function
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
    
    if (userClickedPattern.length===gamePattern.length){
        setTimeout(function (){
            nextSequence();
        },1000);
    }

} else{
  console.log("wrong");

  //sound adding
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game Over,Press Any Key to Start Again!");
   startOver();
}
}


function nextSequence() {
   userClickedPattern =[];
level++;

    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    //Assigning random number to desired color
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    //Animate flash using jquery
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    //Play Sound
    playSound(randomChosenColor);
}
 
 
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
 
 
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}
