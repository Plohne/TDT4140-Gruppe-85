// Question control part lecturer.

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
    // Gives the div 'bubble' the unique key for the question parent so that it can be referenced and removed later.
    bubble.id = key;
   // Creates necessary HTML elements in order to properly add the question and save needed variables.
        bubble.className = "bubble";
    var tekst = document.createElement("p");
    tekst.className = "tekst";
    tekst.textContent = spmet;
    bubble.appendChild(tekst);

    // Here it is running the script that removes the question when you click on it.
    bubble.onclick = removeQ;
  
    // Switching enter that gives linebreak to <br>
    tekst.innerHTML = tekst.innerHTML.replace(/\n/g, '<br>');
    chat.appendChild(bubble);
    setTimeout(function(){
        chat.classList.add('visible')
    }, 1);
    
    chat.scrollTop = chat.scrollHeight;
    console.log(bubble);
}
// Function for adding new questions to database and providing the parent with an unique id.
function askQuestion(question) {
    var aQ = firebase.database().ref("spm");
    var newQ = aQ.push();
//    var spmStilt = document.getElementById("chat-input").value;
    newQ.set({spmet:question});
    document.getElementById("chat-input").value = "";
    
 
 }


loadMessage();