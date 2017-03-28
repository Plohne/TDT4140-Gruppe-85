
// Setting up three sliders ranging from 0 to 100. 
$( "#Not_following_slider, #Doing_fine_slider, #Too_easy_slider").slider({
	orientation: "horizontal",
	range: "min",
	max: 100,
	min: 0,
	slide: function (event, ui) { return false; }
	});

//$( "#Not_following_value" ).val('5');

// Reading values from firebase database and setting it as slider value.
database.ref().on("value", function(snapshot){
    console.log(snapshot.val());
    var red_count = snapshot.val().buttonCounter.red;
    var yellow_count = snapshot.val().buttonCounter.yellow;
    var green_count = snapshot.val().buttonCounter.green;
    
    var sum_input = red_count + yellow_count + green_count;
    var red_average = (red_count / sum_input)*100;
    var yellow_average = (yellow_count / sum_input)*100;
    var green_average = (green_count / sum_input)*100;
    
    $( "#Not_following_slider" ).slider('value',red_average);
    $( "#Doing_fine_slider" ).slider('value',yellow_average);
    $( "#Too_easy_slider" ).slider('value',green_average);
    
    $( "#Not_following_amount" ).val(red_count);
    $( "#Doing_fine_amount" ).val(yellow_count);
    $( "#Too_easy_amount" ).val(green_count);
});

