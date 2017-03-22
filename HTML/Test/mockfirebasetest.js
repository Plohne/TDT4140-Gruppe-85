var MockFirebase = require('mockfirebase').MockFirebase;



var refToFirebase;
var chat ={
    refToFirebase: function(){
        if (!refToFirebase) refToFirebase = new Firebase("https://pu-test-6bfac.firebaseio.com/");
        return refToFirebase;
    }
}



MockFirebase.override();
refToFirebase.flush();