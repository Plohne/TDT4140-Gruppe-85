var redButtonId = document.getElementById("red"); 
var	btnclass = "btn red";



function changeClass(){
	document.getElementById("btnRed").className= btnclass;
}
	
// Function that writes data to the Firebase
function writeButtonData(input){
	
	var baseref = database.ref();
	var classinput = "btn "+input
	baseref.child("Button_input").set(classinput);
	

}

var knappRef = firebase.database().ref().child("Knapp");

knappRef.on('value', function(datasnapshot){
	btnclass = datasnapshot.val();
	document.getElementById("btnRed").className= btnclass;
});