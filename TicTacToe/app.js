
$(document).ready(function(){
	doOnClick();
	});
	var reset = true;
	var choice = "2 player";
	var player1 = "X";
	var player2 = "O";
	var turn = player1;
	var player1Name = "You";
	var player2Name = "Computer";
	var player1Color;
	var player2Color;
	var player1Score = 0;
	var player2Score = 0;
	var lastScore; 
	var turnMessage;
	var winingMessage; 
	var playerBoard = ["1a", "2a", "3a", 
					   "1b", "2b", "3b", 
					   "1c", "2c", "3c"];
	var emptyFields = ["1a", "2a", "3a", 
					  "1b", "2b", "3b", 
					  "1c", "2c", "3c"];
	var fieldName;
	var winingCombinations = [["1a","1b","1c"], ["2a","2b","2c"], ["3a","3b","3c"], ["1a","2b","3c"], ["1c","2b","3a"]];

	var $field = $("td").text();
	var $showWiningInfo = $(".message");
	var $showTurnInfo = $(".turn-info");
	var $audioTie = $("audio")[1]; 
    var $audioSign = $("audio")[2]; 
   //On.click func
	function doOnClick(){
	  $("#reset").on("click", function(){
		resetGame();
	  });
	  $(".choose-2").on("click", function(){
		$(".choose-game").css("display", "none");
		$(".players-names").css("display", "block"); 
		choice = "2 player";
	  });
	  $(".start-game").on("click", function(){
		 startGame();
		 $(".players-names").css("display", "none");   
	  });
  
	  $(".choose-x").on("click", function(){
		player1 = "X";
		console.log("You picked 'X'!")
		$(".choose").css("display", "none");
		chooseSign();
		playAgain();
	  });
  
	  $(".choose-o").on("click", function(){
		player1 = "O";
		console.log("You picked 'O'!")
		$(".choose").css("display", "none");
		chooseSign();
		playAgain();
	  });
  
	  $("td").on("click", function(e){
		fieldName = $(this).attr("id");
		$audioSign.play();
		if($(this).hasClass("td-clicked")){
		  $(this).preventDefault();
		}
		reset = false;
  
		if(player2Name !== "Computer"){
		  if(turn === player1){
			  if(playerTurn(player1)){
			   return;
			  }
		   }else{
			  if(playerTurn(player2)){
			   return;
			  }
		  }
		}else{
		   if(turn === player1){
			 if(playerTurn(player1) || emptyFields.length === 0){    
			  return; 
			 }}}});}
		  
   //Set players names
	function startGame(){
	   player1Name = $("input#player1name").val();
	   player2Name = $("input#player2name").val();
	   if(!player1Name){
		 player1Name = "Player 1";
	   }
	   if(!player2Name){
		 player2Name = "Player 2";
	   }     
	  return chooseSign();
	} 
  
   //(always player with 'X' sign)
	function chooseSign(){
	$(".choose-sign").css("display", "block");
	  if(player1Name === "You"){
		$(".choose-sign p").html(player1Name + " " + "pick first");
	  }else{
		$(".choose-sign p").html(player1Name + " " + "picks first");
	  }// signs 
	  if(player1 === "X"){
		 player2 = "O";  
		 turn = player1;
	  }else{
		 player2 = "X";
		 turn = player2;
	  }  
	}
   //Reset
	function playAgain(){  
	  $(".fields, .scores").css("display", "block")
	  $("td").html("");
	  $(".message").css("display", "none").html("");
	  emptyFields = ["1a", "2a", "3a", 
				   "1b", "2b", "3b", 
				   "1c", "2c", "3c"];
	  playerBoard = ["1a", "2a", "3a", 
					"1b", "2b", "3b", 
					"1c", "2c", "3c"];
	  
	  $("td").css("color", "#333333");
	  $("td").removeClass("td-clicked");
	  $("td").removeClass("td-winning-color").removeClass("animated pulse");
	  scoreInfo();
		  
	  // player who won score in last game goes first in next game, or
	  //If after game is drawn, player who won score in previous game goes first again, or
	  //If after first game is drawn, player who went first at the begining goes first again 
	  if(lastScore === player2 || 
		 winingMessage === "It's Tie!" && lastScore === player2 ||
		 !lastScore && winingMessage == "It's Tie!" && turn === player2){
	
           return updateTurn(player1); 
           
	  }else if(lastScore === player1 || 
			   winingMessage === "It's Tie!" && lastScore === player1 || 
			   !lastScore && winingMessage == "It's Tie!" && turn === player1){
		  return updateTurn(player2);
	  }else{
		  return updateTurn(turn);
		}}	
   // check if there is wining combination and update whose turn is, return new playerboard
	function playerTurn(player){
	   if(emptyFields.includes(fieldName)){
		  emptyFields.splice(emptyFields.indexOf(fieldName),1); 
		  playerBoard[playerBoard.indexOf(fieldName)] = player;
		 
		 $("#" + fieldName).addClass("td-clicked").html(player);
  
		 if(player === "X"){
		   $("#" + fieldName).css("color", "#4fad32");
		 }
  
		 if(checkResult(player)){
			winInfo();
			setTimeout(playAgain, 1500);
			return true;
		  }
		  if(emptyFields.length === 0 && !checkResult(player)){
			winInfo();
			setTimeout(playAgain, 1500);
			return;
		  }
		 
		 updateTurn(player);
	   }  }
   //Checking for wining + winingMessage 
	function checkResult(player){
	 if($("#1a").text() === player && $("#2a").text() === player && $("#3a").text() === player){
	   $("#1a, #2a, #3a").addClass('td-winning-color');
	   return winnerUpdate(player);
	 }
	 else if($("#1b").text() === player && $("#2b").text() === player && $("#3b").text() === player){
	   $("#1b, #2b, #3b").addClass('td-winning-color');
		return winnerUpdate(player);
	 }
	 else if($("#1c").text() === player && $("#2c").text() === player && $("#3c").text() === player){
	   $("#1c, #2c, #3c").addClass('td-winning-color');
	   return winnerUpdate(player);
	 }
	 else if($("#1a").text() === player && $("#2b").text() === player && $("#3c").text() === player){
	   $("#1a, #2b, #3c").addClass('td-winning-color');
	   return winnerUpdate(player);
	 }
	 else if($("#3a").text() === player && $("#2b").text() === player && $("#1c").text() === player){
	   $("#3a, #2b, #1c").addClass('td-winning-color');
	   return winnerUpdate(player);
	 }
	 else if($("#1a").text() === player && $("#1b").text() === player && $("#1c").text() === player){
	   $("#1a, #1b, #1c").addClass('td-winning-color');
	   return winnerUpdate(player);
	 }
	 else if($("#2a").text() === player && $("#2b").text() === player && $("#2c").text() === player){
	   $("#2a, #2b, #2c").addClass('td-winning-color');
	   return winnerUpdate(player);
	 }
	 else if($("#3a").text() === player && $("#3b").text() === player && $("#3c").text() === player){
	   $("#3a, #3b, #3c").addClass('td-winning-color');
	   return winnerUpdate(player);
	 }else{
		winingMessage = "It's Tie!";
		return false;
		}}
   //Update and display/show turn message  
	function updateTurn(player){
	   if(reset){
	   if(player === player2){
			turnMessage = player2Name + " goes first !";
		 turnInfo();
		 return;
		 }
	   if(player === player1){
		  if(player1Name === "You"){
			turnMessage = player1Name + " go first !";
		  }else{
			turnMessage = player1Name + " goes first !"
		  }   }
		 turnInfo();
		 return;}
	  // show whose turn is now 
	   if(player === player1){
			turn = player2;
			turnMessage = "It's " + player2Name + "'s turn !";
		 }
	   if(player === player2){
			turn = player1;
		  if(player1Name === "You"){
			turnMessage = "It's " + player1Name + "r turn !";
		  }else{
			turnMessage = "It's " + player1Name + "'s turn !";
		  }   }
	   return turnInfo();
	 }
   //Define wining message and update scores
	function winnerUpdate(player){
	   lastScore = player;
	  if(player === player1){
		winingMessage = player1Name + " " + "Won!!";
		player1Score++;
	  }
		if(player === player2){
		winingMessage = player2Name + " " + "Won!!";
		player2Score++;
	  }     
		scoreInfo();
        return winingMessage; 

  }
	 
   ///show current scores
	function scoreInfo(){
		$( ".scores p" ).html(player1Score + " : " + player2Score);
		$(".player2-score").html(player2Name + "'s score: " + player2Score);
		$(".player1-score").html(player1Name + "'s score: " + player1Score);
	  
	  if(player1Name === "You"){
		$(".player1-score").html(player1Name + "r score: " + player1Score);
	  }
	}
   //winner message
	function winInfo(){
		$showWiningInfo.css("display", "block").html("<p>" + winingMessage + "</p>");
	  if(winingMessage === "It's Tie!"){
		 $audioTie.play();
         }
		$showTurnInfo.css("display", "none");   
	} 
   //show turn message
	function turnInfo(){
	  $showTurnInfo.css("display", "block").html(turnMessage);
	} 
   //Reset all value to begining 
	function resetGame(){
	  reset = true;
	  player1Score = 0;
	  player2Score = 0;
	  lastScore= "";
	  emptyFields = ["1a", "2a", "3a", 
				   "1b", "2b", "3b", 
				   "1c", "2c", "3c"];
	  playerBoard = ["1a", "2a", "3a", 
					"1b", "2b", "3b", 
					"1c", "2c", "3c"];
	  winingMessage = "";
	  turnMessage = "";
	  player1Name = "You";
	  player2Name = "Computer";
	  $("input#player1name").val("");
	  $("input#player2name").val("");
	  
	  $('.btn-group :radio').prop('checked', false);
  
	  $("td").removeClass("td-winning-color");
	  $("td").removeClass("td-clicked");  
	  $(".choose,  .choose-game").css("display", "block");
	  $(".fields, .scores, .turn-info, .message, .choose-sign, .choose-level, .players-names ").css("display", "none");
	} 
   //
	function aiPredictBestMove(){
	  //Define empty spaces/indexes in New board arr
	  function getEmptyIndexies(board){
		return board.filter(s => s!=="X" && s!=="O");
	  }
	  // The main minimax function
	  function minimax(newBoard, player){
		//add one to function calls
		fc++;
		//available spots
		var availSpots = getEmptyIndexies(newBoard);
		// an array to collect all the objects
		var moves = [];
		// loop through available spots
		for (var i = 0; i < availSpots.length; i++){
		  //create an object for each and store the index of that spot 
		  var move = {};
		  move.index = newBoard[availSpots[i]];
  
		  // set the empty spot to the current player
		  newBoard[availSpots[i]] = player;
  
		  // reset the spot to empty
		  newBoard[availSpots[i]] = move.index;
  
		  // push the object to the array
		  moves.push(move);
		}
	  // return the chosen move (object) from the moves array
		return moves[bestMove];
	  }}//end of aiPredictBestMove func;
  //background audio
	var audio, playbtn;
	function initAudioPlayer(){
		audio = new Audio();
		audio.src = "images/Toy Story -Youve Got a Friend in Me.mp3";
		audio.loop = true;
		audio.play();
		playbtn = document.getElementById("playpausebtn");
		playbtn.addEventListener("click",playPause);
		function playPause(){
			if(audio.paused){
				audio.play();
				playbtn.style.background = "url(images/microphone.svg) no-repeat";
			} else {
				audio.pause();
				playbtn.style.background = "url(images/muted.svg) no-repeat";
			}}}
	window.addEventListener("load", initAudioPlayer);