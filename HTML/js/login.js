
var pinSubmit = document.getElementById("pinSubmit");
// Venter på pin input
$(document).ready(function() {
	pinSubmit.onclick = function(){
		pinEntry();
	}
});
// Function for matching the input pin to the pin stored in the database.
function pinEntry(){
	var pinEntered;
	database.ref().once("value", function(snapshot){
		console.log(snapshot.val().pin);
		pinEntered = snapshot.val().pin; }).then(function(){

			var pinInput = document.getElementById("passID2");

			if (pinEntered == pinInput.value){
				window.location.assign("Students.html");
				return 1;
			}
			else{
				window.alert("Wrong pin");
				return 0;
			}
		});
}
