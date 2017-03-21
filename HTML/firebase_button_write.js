
var red_button = document.getElementById("red");
var yellow_button = document.getElementById("yellow");
var green_button = document.getElementById("green");
var newClick;
var un_click;

// Listeners to register if buttons are clicked in 'Students.html'.
$(document).ready(function() {

	red_button.onclick = function() {
		console.log("clicked: %o", this);
		$.when(writeButtonData('red')).then(disableButton('red'));
	}
	yellow_button.onclick = function() {
		console.log("clicked: %o", this);
		$.when(writeButtonData('yellow')).then(disableButton('yellow'));
	}
	green_button.onclick = function() {
		console.log("clicked: %o", this);
		$.when(writeButtonData('green')).then(disableButton('green'));
	}
});



// Function that registers the button pressed in the Firebase database.
function writeButtonData(input){	

	// Writes the color of pushed button to 'Button_input'.
	database.ref().update({Button_input: input
    });
	
	// Updates number of button clicks to the relevant button counter.
	newClick = 0;
	console.log("newClick 1: %d", newClick);
	var buttonRef = database.ref().child('buttonCounter').child(input);
	buttonRef.once('value', function(snapshot) {
		  newClick = snapshot.val();
		  console.log("newClick 2: %d", newClick);
		  	  
	}).then(function(){ // needed to ensure that the value is aquired from firebase before moving on.
		newClick += 1;
		console.log("newClick 3: %d", newClick);
		buttonRef.set(newClick);
	});
}

// Removes registration for a button in the Firebase database if a new button is pressed.
function removeButtonData(input){	

	// Writes the color of pushed button to 'Button_input'.
	database.ref().update({Button_input: input
    });
	
	// Updates number of button clicks to the relevant button counter.
//	un_click = 0;
	var buttonRef = database.ref().child('buttonCounter').child(input);
	buttonRef.once('value', function(snapshot) {
		un_click = snapshot.val();	 
		
	}).then(function(){// needed to ensure that the value is aquired from firebase before moving on.
		if(un_click > 0){
			un_click -= 1;
			buttonRef.set(un_click);
		}
	});
}

// Function to disable the pressed button and re-enable previous pressed button again if another button is pressed.
function disableButton(buttonId) {
	
	if(red_button.disabled) {
		removeButtonData('red');
		red_button.disabled = false;
	}
	
	if(yellow_button.disabled) {
		removeButtonData('yellow');
		yellow_button.disabled = false;
	}
	
	if(green_button.disabled) {
		removeButtonData('green');
		green_button.disabled = false;
	}
	
	var pressed_button = document.getElementById(buttonId);
	pressed_button.disabled = true;
}


// Question submit part

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
    
   
    bubble.id = key;
   
    
    bubble.className = "bubble";
    var tekst = document.createElement("p");
    tekst.className = "tekst";
    tekst.textContent = spmet;
    bubble.appendChild(tekst);

    
    bubble.onclick = removeQ;
    
    /*
    var removeRef = firebase.database().ref("spm");
    removeRef.on('child_removed', function(e){
        console.log("Funksjon kjører")
         document.getElementById(e.target.id).remove();
    } );


    */  
        

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