window.onload = function(){
    
//Endrer farge på knapp til grå
var gulKnapp = document.getElementById("knappy");
var rodKnapp = document.getElementById("knappr");
var gronnKnapp = document.getElementById("knappg");

gulKnapp.style.background='#AAAAAA';
rodKnapp.style.background='#AAAAAA';
gronnKnapp.style.background='#AAAAAA';


database.ref().on("value", function(snapshot){
    console.log(snapshot.val());
    if (snapshot.val().Button_input == "yellow"){
        gulKnapp.style.background='#f1c40f';
        rodKnapp.style.background='#AAAAAA';
        gronnKnapp.style.background='#AAAAAA';

    }
    if (snapshot.val().Button_input == "red"){
        rodKnapp.style.background='#e74c3c';
        gulKnapp.style.background='#AAAAAA';
        gronnKnapp.style.background='#AAAAAA';

    }
     if (snapshot.val().Button_input == "green"){
        gronnKnapp.style.background='#2ecc71';
         gulKnapp.style.background='#AAAAAA';	
         rodKnapp.style.background='#AAAAAA';

     }
    });
    
    };