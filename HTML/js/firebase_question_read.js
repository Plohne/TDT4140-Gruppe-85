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
       
    bubble.id = key;
   
        bubble.className = "bubble";
    var tekst = document.createElement("p");
    tekst.className = "tekst";
    tekst.textContent = spmet;
    bubble.appendChild(tekst);

    
    bubble.onclick = removeQ;
 
    //bytter enter som gir linjeskift til <br>
    tekst.innerHTML = tekst.innerHTML.replace(/\n/g, '<br>');
    chat.appendChild(bubble);
    setTimeout(function(){
        chat.classList.add('visible')
    }, 1);
    
    chat.scrollTop = chat.scrollHeight;
    console.log(bubble);
}

function askQuestion(question) {
    var aQ = firebase.database().ref("spm");
    var newQ = aQ.push();
//    var spmStilt = document.getElementById("chat-input").value;
    newQ.set({spmet:question});
    document.getElementById("chat-input").value = "";
    
 
 }


loadMessage();