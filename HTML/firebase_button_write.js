
// Function that writes data to the Firebase database.
function writeButtonData(input){	

	// Writes the color of pushed button to 'Button_input'.
	database.ref().update({Button_input: input
    });
	
	// Updates number of button clicks to the relevant button counter.
	var newClick;
	var buttonRef = database.ref().child('buttonCounter').child(input);
	buttonRef.on('value', function(snapshot) {
		  newClick = snapshot.val();	  
	});
	newClick += 1;
	buttonRef.set(newClick);
}





var MESSAGE_TEMPLATE =
    '<div class ="bubble">' + 
    '<p class = "tekst"></p></div>';
    //'<span class = "datestamp"></span>';


function loadMessage(){
    var spmRef = firebase.database().ref("spm");
    spmRef.off();
    var setMessage = function(data){
        var val = data.val();
        var key = data.getKey();
        displayMessage(val.spmet, key);
    }
    console.log("legger til listener");
    spmRef.on('child_added', setMessage);
    
}
function displayMessage(spmet, key){
    console.log("Viser spørsmålet");
    var chat = document.getElementById("cont1");
    var bubble = document.createElement("div");
    
   
    bubble.id = key;
   
    
    bubble.className = "bubble";
    var tekst = document.createElement("p");
    tekst.className = "tekst";
    tekst.textContent = spmet;
    bubble.appendChild(tekst);

    
    bubble.onclick = removeQ;
    
    
    var removeRef = firebase.database().ref("spm");
    removeRef.on('child_removed', function(e){
         document.getElementById(e.target.id).remove();
    } );

      
        
   
    
    
    //bytter enter som gir linjeskift til <br>
    tekst.innerHTML = tekst.innerHTML.replace(/\n/g, '<br>');
    chat.appendChild(bubble);
    setTimeout(function(){
        chat.classList.add('visible')
    }, 1);
    
    chat.scrollTop = chat.scrollHeight;
    console.log(bubble);
}



/*
function loadquestion(){
    var spmRef = firebase.database().ref("spm");
    spmRef.once("value").then(function(questions){
        questions.forEach(function(question){
            var q1 = document.getElementById("cont1");
            var q = document.createElement("div");
            q.className="bubble";
            q.innerHTML = "<p>" + question.val().spmet+ "</p>" ;
           q1.appendChild(q);
            
            console.log(question.val().spmet);
        });
    });
};
*/


/*

spmRef.limitToLast(1).on("child_added", function(snapshot){
    if (first) {
        snapshot.forEach(function())

        /*var q1 = document.getElementById("UNIQUEID");
    q1.innerText += "\n" + "\n" +  snapshot.val();
        console.log(snapshot.val());

        first = false;
    } else{
        console.log("else");
         
        
    }
    
})
*/


/*
spmRef.on("child_added", function(snapshot, prevChildKey) {
  var newPost = snapshot.val();
    
    
    var q1 = document.getElementById("UNIQUEID");
    q1.innerText += "\n" + "\n" +  newPost;

});
*/



function askQuestion() {
    var aQ = firebase.database().ref("spm");
    var newQ = aQ.push();
    var spmStilt = document.getElementById("chat-input").value;
    newQ.set({spmet:spmStilt});
    document.getElementById("chat-input").value = "";
    
 
 }


loadMessage();