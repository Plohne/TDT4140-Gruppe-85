//Finds the unique key that has been stored with the question in the div itself. 
//Here we have to change it later so that it applies to an eventual button or similar in order to have a more logical UI.
function removeQ(e) {

	document.getElementById(e.target.id).remove();

	var questionKey = e.target.id;

	myremoveRef = database.ref("spm").child(questionKey);
	myremoveRef.remove();
}