$( "#Not_following_slider, #Doing_fine_slider, #Too_easy_slider").slider({
	orientation: "horizontal",
	max: 100,
	min: 0
});

//$( "#Not_following_value" ).val('5');


database.ref().on("value", function(snapshot){
    console.log(snapshot.val());
    $( "#Not_following_slider" ).slider('value',snapshot.val().buttonCounter.red);
    $( "#Doing_fine_slider" ).slider('value',snapshot.val().buttonCounter.yellow);
    $( "#Too_easy_slider" ).slider('value',snapshot.val().buttonCounter.green);
});

