/**
 * 
 */

var saveClick = 0;
var testClickAfter = 0;



var redButtonRef = database.ref().child('buttonCounter').child('red');
redButtonRef.once('value', function(snapshot) {
	saveClick = snapshot.val();
	console.log("saveClick = %d", saveClick);
});



QUnit.test( "Button add", function( assert ) {

	var done = assert.async();

	writeButtonData('red');

	setTimeout(function() {
		redButtonRef.once('value', function(snapshot) {
			testClickAfter = snapshot.val();

		}).then(function(){
			assert.ok( testClickAfter == (saveClick + 1), "Red button click added to firebase." );
			console.log("testClickAfter = %d", testClickAfter);
			redButtonRef.set(saveClick);
			done();
		}); 
	}, 1500);
});


QUnit.test( "Button remove", function( assert ) {

	var done = assert.async();

	removeButtonData('red');

	setTimeout(function() {
		redButtonRef.once('value', function(snapshot) {
			testClickAfter = snapshot.val();

		}).then(function(){
			assert.ok( testClickAfter == (saveClick - 1), "Red button click removed from firebase." );
			console.log("testClickAfter = %d", testClickAfter);
			redButtonRef.set(saveClick);
			done();
		}); 
	}, 1500);
});

/*
QUnit.test( "Button add", function( assert ) {
	var done = assert.async();

	var buttonRes = writeButtonData('red');
	while (buttonRes == "undefined"){};

	setTimeout(function() {
		assert.ok(buttonRes, "Red button data written");
		alert(buttonRes);
	    done();
	  }, 2000);


});
 */
QUnit.test( "Disable button", function(assert) {
	disableButton("red");
	assert.ok( redButton.disabled, "Red disabled");
//	redButton.disabled = false;

	disableButton("yellow");
	assert.ok( yellowButton.disabled, "Yellow disabled");
//	yellowButton.disabled = false;

	disableButton("green");
	assert.ok( greenButton.disabled, "Green disabled");
//	yellowButton.disabled = false;

	disableButton("red");
	assert.ok( redButton.disabled, "Red disabled");
	redButton.disabled = false;
	
});


QUnit.test("Pin generator test", function (assert){

	pinTopLimit = 9999;
	pinBottomLimit = 0;

	assert.ok( generatePin () < pinTopLimit , "Pin within top limit");
	assert.ok( generatePin () > pinBottomLimit , "Pin within bottom limit");

	assert.notEqual(generatePin (), generatePin (), "Not giving same number");

});

QUnit.test("Calc average", function ( assert ){
	assert.equal(calcAverage(5,10), 50 , "Correct average");
});

