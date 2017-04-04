/**
 * Registers button clicks and question submits from 'Students.html' and sends to firebase.
 */
var redButton = document.getElementById("red");
var yellowButton = document.getElementById("yellow");
var greenButton = document.getElementById("green");
var newClick;
var unClick;

//Listeners to register if buttons are clicked in 'Students.html'.
$(document).ready(function() {

	redButton.onclick = function() {
		console.log("clicked: %o", this);
		$.when(writeButtonData('red')).then(disableButton('red'));
	}
	yellowButton.onclick = function() {
		console.log("clicked: %o", this);
		$.when(writeButtonData('yellow')).then(disableButton('yellow'));
	}
	greenButton.onclick = function() {
		console.log("clicked: %o", this);
		$.when(writeButtonData('green')).then(disableButton('green'));
	}
});

//Function that registers the button pressed in the Firebase database.
function writeButtonData(input){	

	// Updates number of button clicks to the relevant button counter.
	newClick = 0;
	console.log("newClick 1: %d", newClick);
	var buttonRef = database.ref().child('buttonCounter').child(input);
	buttonRef.once('value', function(snapshot) {
		newClick = snapshot.val();
		console.log("newClick 2: %d", newClick);

	}).then(function(){ // needed to ensure that the value is acquired from firebase before moving on.
		newClick += 1;
		console.log("newClick 3: %d", newClick);
		buttonRef.set(newClick, function(error){
			if(error){
				return false;
			} else {
				return true;
			} 
		});
	});
}

//Removes registration for a button in the Firebase database if a new button is pressed.
function removeButtonData(input){	

	// Updates number of button clicks to the relevant button counter.
	var buttonRef = database.ref().child('buttonCounter').child(input);
	buttonRef.once('value', function(snapshot) {
		unClick = snapshot.val();	 

	}).then(function(){// needed to ensure that the value is aquired from firebase before moving on.
		if(unClick > 0){
			unClick -= 1;
			buttonRef.set(unClick);
		}
	});
}

//Function to disable the pressed button and re-enable previous pressed button again if another button is pressed.
function disableButton(buttonId) {

	if(redButton.disabled) {
		removeButtonData('red');
		redButton.disabled = false;
	}

	if(yellowButton.disabled) {
		removeButtonData('yellow');
		yellowButton.disabled = false;
	}

	if(greenButton.disabled) {
		removeButtonData('green');
		greenButton.disabled = false;
	}

	var pressedButton = document.getElementById(buttonId);
	pressedButton.disabled = true;
}


//Question submit part

var MESSAGE_TEMPLATE =
	'<div class ="bubble">' + 
	'<p class = "tekst"></p></div>';


function loadMessage(){
	var spmRef = firebase.database().ref("spm");
	spmRef.off();
	var setMessage = function(data){
		var val = data.val();
		var key = data.getKey();
		displayMessage(val.spmet, key);
	}
	var removeQuestion = function(data){
		var key = data.getKey();
		var element = document.getElementById(key);
		element.parentNode.removeChild(element);
	}

	console.log("legger til listener");
	spmRef.on('child_added', setMessage);
	spmRef.on('child_removed',removeQuestion);

}

function displayMessage(spmet, key){
	console.log("Viser spørsmålet");
	var chat = document.getElementById("cont1");
	var bubble = document.createElement("div");
	// Gives the div 'bubble' the unique key for the question parent so that it can be referenced and removed later.
	bubble.id = key;
	// Creates necessary HTML elements in order to properly add the question and save needed variables.
	bubble.className = "bubble";
	var tekst = document.createElement("p");
	tekst.className = "tekst";
	tekst.textContent = spmet;
	bubble.appendChild(tekst);

	bubble.onclick = removeQ;

	//switch enter that gives linebreak for <br>
	tekst.innerHTML = tekst.innerHTML.replace(/\n/g, '<br>');
	chat.appendChild(bubble);
	setTimeout(function(){
		chat.classList.add('visible')
	}, 1);

	chat.scrollTop = chat.scrollHeight;
	console.log(bubble);
}

//Function for adding questions to database, pushing spm into the database and provides the parent with a unique ID.
function askQuestion(question) {
	var aQ = firebase.database().ref("spm");
	var newQ = aQ.push();
//	var spmStilt = document.getElementById("chat-input").value;
	newQ.set({spmet:question});
	document.getElementById("chat-input").value = "";

}

loadMessage();