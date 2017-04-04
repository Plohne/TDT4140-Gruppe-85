/**
 * 
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


QUnit.test("Login test", function( assert ) {
	var done = assert.async();

	pinEntry();

	setTimeout(function() {
		// add an assertion to make sure alert was called
		assert.equal( window.alert.called, 1, "alert was called only once" );
		done();
	}, 1500);
});