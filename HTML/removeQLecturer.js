function removeQ(e) {
    
    document.getElementById(e.target.id).remove();
    
    var questionKey = e.target.id;

    myremoveRef = database.ref("spm").child(questionKey);
    myremoveRef.remove();
 }