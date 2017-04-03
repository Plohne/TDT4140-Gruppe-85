/**
 * 
 */

var redButton = document.getElementById("red");
var yellowButton = document.getElementById("yellow");
var greenButton = document.getElementById("green");
var newClick;
var unClick;

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