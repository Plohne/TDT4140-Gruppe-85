/**
 * Testing of log in functionality.
 */

QUnit.begin(function() {
	// mock out the alert method to test that it was called without actually getting an alert
	window.alert = function() {
		window.alert.called++;
	};
	window.alert.called = 0;
});
QUnit.testDone(function() {
	// reset the alert called count after each test
	window.alert.called = 0;
});


QUnit.test("Pin generator test", function (assert){

	pinTopLimit = 9999;
	pinBottomLimit = 0;

	var pin1 = generatePin ();
	var pin2 = generatePin ();
	
	assert.ok( pin1 < pinTopLimit , "Pin within top limit");
	assert.ok( pin1 > pinBottomLimit , "Pin within bottom limit");

	assert.notEqual(pin1, pin2, "Not giving same number");

});

QUnit.test("Login test", function( assert ) {
	var done = assert.async();


	 $("#pinSubmit").trigger("click");
	
	//pinEntry();

	setTimeout(function() {
		// add an assertion to make sure alert was called
		assert.equal( window.alert.called, 1, "alert was called only once" );
		done();
	}, 1500);
});