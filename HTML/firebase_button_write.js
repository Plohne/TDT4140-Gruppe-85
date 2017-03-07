
// Function that writes data to the Firebase
function writeButtonData(input){	
	database.ref().update({
        Button_input: input
    });
	var newClick;
	var buttonRef = database.ref().child('buttonCounter').child(input);
	buttonRef.on('value', function(snapshot) {
		  newClick = snapshot.val();
		  
	});
	newClick += 1;

	buttonRef.set(newClick);

	
}


var q2 = document.getElementById("spm2");
var q3 = document.getElementById("spm3");



var spmRef = firebase.database().ref("spm");

spmRef.on("child_added", function(snapshot, prevChildKey) {
  var newPost = snapshot.val();
    var q1 = document.getElementById("UNIQUEID");
    q1.innerText += "\n" + "\n" +  newPost;

});


function askQuestion() {
    var aQ = firebase.database().ref("spm");
    var newQ = aQ.push();
    var spmStilt = document.getElementById("studentSpm").value;
    newQ.set({spmet:spmStilt});
    document.getElementById("studentSpm").value = "";
    
    var spmID2 = newQ.getKey();
    

}