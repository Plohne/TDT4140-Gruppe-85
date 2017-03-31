
var pinSubmit = document.getElementById("pinSubmit");

$(document).ready(function() {
	pinSubmit.onclick = function(){
		pinEntry();
	}
});

function pinEntry(){
	var pinEntered;
	database.ref().once("value", function(snapshot){
		console.log(snapshot.val().pin);
		pinEntered = snapshot.val().pin; }).then(function(){

			var pinInput = document.getElementById("passID2");

			if (pinEntered == pinInput.value){
				window.location.assign("Students.html");
			}
			else{
				window.alert("Wrong pin");
			}
		});
}
