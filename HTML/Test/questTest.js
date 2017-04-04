/**
 * Testing that a question is written to firebase.
 */

var questArray = [];
var questArrayRemoved = [];
var questionID;

var allQuest = [];
var questRef = database.ref("spm").orderByKey();


QUnit.test( "Question added", function( assert ) {

	var done = assert.async();
	var testQuestion = "Test Quest";
	
	console.log("testQuestion1 = %s", testQuestion);
	console.log(allQuest);

	questRef.once("value", function(questions){
		questions.forEach(function(question){
			allQuest.push(question.val().spmet);
		});
	}).then(function(){
		askQuestion(testQuestion);
		console.log("askQuestion");
	});

	setTimeout(function() {
		questRef.once("value", function(questions){
			questions.forEach(function(question){
				questArray.push(question.val().spmet);
			});
		}).then(function(){
			console.log("questArray length = %d", questArray.length);
			console.log(questArray);
			assert.ok( questArray.length == allQuest.length + 1 , "Question added to firebase." );
			done();
		}); 
	}, 1500);
});