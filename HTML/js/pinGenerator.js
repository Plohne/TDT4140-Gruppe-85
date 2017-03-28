
function lecturerGenerate(){

database.ref().update({pin: generatePin()
    });
}

function generatePin () {
    min = 0,
    max = 9999;
    var tempPass = ("0" + Math.floor(Math.random() * (max - min + 1)) + min).substr(-4)
   
    var pin = document.getElementById("pinDisplay");
    pin.innerText =("Pin: " + tempPass.toString());
    
    return tempPass;
    
}