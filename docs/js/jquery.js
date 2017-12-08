var playing = false;
var score;
var trialsLeft;
var fruits = ["apple","orange","pera","strawberry","watermelon"];
var step;
var action; //used in the setInterval function
$(function(){
    //click on start reset button
   $("#startreset").click(function(){
       //are we playing?
       if(playing==true){
            //reload page
           location.reload();   
       }
       else{
           playing = true;
           
           //set score to 0
           score = 0;
           $("#scorevalue").html(score);
           
           //show trials left
           $("#trialsLeft").show();
           trialsLeft = 3;
           addHearts();
           
           //hide Game Over box
           $("#gameOver").hide();
           
           //change button text to "reset game"
           $("#startreset").html("Resetar!");
           
           startAction();
           
        }
   });


    $("#fruit1").mouseover(function(){
       score++;
        $("#scorevalue").html(score);//update Score
        $("#slicesound")[0].play();//playsound
        
        //stop fruit
        clearInterval(action);
        
        //hide fruit
        $("#fruit1").hide("explode", 400); //slice fruit
        
        //send a new fruit
        setTimeout(startAction, 500);
    });




//functions
function addHearts(){
    $("#trialsLeft").empty();
    for( i = 0; i < trialsLeft; i++){
               $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

//start fruit drop

function startAction(){
    $("#fruit1").show();
    chooseFruit(); // choose a random src fruit
    $("#fruit1").css({'left':Math.round(550*Math.random()),'top': -75}); //random position
    
    //generate random step
    step = 1 + Math.round(5*Math.random());
    
    //move fruit down 1 step every 10ms
    action = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step);
        
            //check if the fruit is too low
            if($("#fruit1").position().top > $("#fruitContainer").height()){
                //check for trials left
                if(trialsLeft > 1){
                     $("#fruit1").show();
    chooseFruit(); // choose a random src fruit
    $("#fruit1").css({'left':Math.round(550*Math.random()),'top': -75}); //random position
    
    //generate random step
    step = 1 + Math.round(5*Math.random());
                    
                    //reduce trials by one
                    trialsLeft --;
                    
                    addHearts();
                }
                else{
                    //game over
                    playing = false;
                    $("#startreset").html("Começar!");
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p> Sua Pontuação foi: ' + score +'</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
    }, 10);
     
}

//generate de fruit
function chooseFruit(){
    
    $("#fruit1").attr('src' , 'images/' + fruits[Math.round(4*Math.random())] +'.png');
}

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
  
});