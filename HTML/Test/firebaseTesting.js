/**
* Testing adding and removal of question on Firebase.
*/

var spmArray = [];
var spmArrayRemoved = [];
var questionID;

//Skriver spm til database

function getAllQuestions(callback){
	var alleSpm = [];
	firebase.database().ref("spm").orderByKey().once("value", function(questions){
		questions.forEach(function(question){
			alleSpm.push(question.val().spmet);
		})
	}).then(function(){
		callback(alleSpm);
	});
}

function logQBeforeAdd(alleSpm){
	console.log("1) Add question-test:")
	console.log("Questions in database before we add a new question 'Testspm'");
	console.log(alleSpm);
	askQuestion();
}

function logQAfterAdd(alleSpm){
	console.log("Questions in database after we add a new question 'Testspm' ");
	console.log(alleSpm);
	testAddQ();
}

function checkQuestion(callback, callback2){
	//Hente alle spm fra database, console log dette. Vis før og etter spm er lagt til.

	firebase.database().ref("spm").once("child_added", function(questions){
		spmArray.push(questions.val().spmet);
		callback(callback2);
	});
}

function testAddQ(){
	var isTrue = "Testspm" === spmArray[0];

	console.assert(isTrue);

	if (isTrue){
		console.log("Ask question-test worked");
	}
	removeQuestion();  
}

function askQuestion() {
	var aQ = firebase.database().ref("spm");
	var newQ = aQ.push({spmet: "Testspm"});
	questionID = newQ.key;
	checkQuestion(getAllQuestions,logQAfterAdd);
}

//Fjerner spm fra database

function removedQuestion(callback){
	firebase.database().ref("spm").orderByKey().once("value", function(questions){
		questions.forEach(function(question){
			spmArrayRemoved.push(question.val().spmet);
		});
	}).then(function(){
		callback();
	});
}

function testCheckRemovedQ(){
	console.log("Testspm skal ikke lenger ligge i lista: ");
	console.log(spmArrayRemoved);
	var isTrue = !spmArrayRemoved.includes("Testspm");
	console.assert(isTrue);
	if (isTrue){
		console.log("Remove question-test worked");
	}
}

function removeQuestion(){
	console.log()
	console.log("----------------------------------------");
	console.log()

	console.log("2) Remove question-test");
	console.log("Remove 'TestSpm' from database");
	firebase.database().ref("spm").child(questionID).remove();
	removedQuestion(testCheckRemovedQ);
}

getAllQuestions(logQBeforeAdd);
