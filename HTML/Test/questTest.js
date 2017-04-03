/**
 * 
 */

var questArray = [];
var questArrayRemoved = [];
var questionID;

//Skriver spm til database

var allQuest = [];
var questRef = firebase.database().ref("spm").orderByKey()
questRef.once("value", function(questions){
	questions.forEach(function(question){
		allQuest.push(question.val().spmet);
	});
});

QUnit.test( "Question added", function( assert ) {

	var done = assert.async();
	var testQuestion = "Test Quest";
	console.log("testQuestion1 = %s", testQuestion);
	console.log(allQuest);
	
	document.getElementById("chat-input").textContent = testQuestion;
	askQuestion();

	setTimeout(function() {
		questRef.once("value", function(questions){
			questions.forEach(function(question){
				allQuest.push(question.val().spmet);
			});


		}).then(function(){
			assert.ok( testQuestion === questArray[0], "Question added to firebase." );
			console.log("testQuestion2 = %d", testQuestion);

			done();
		}); 
	}, 1500);
});