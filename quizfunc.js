
var readlineSync = require('readline-sync');
    format = require('string-format');
    chalk = require('chalk').styles;
var fs = require('fs');

format.extend(String.prototype);



/**
* Output the list of Quizzes, from the local json direcory 'sample.json' 
* to the console
*/
function listquiz() {
	var content = fs.readFileSync('local_repo.json', 'utf8');
	var obj = JSON.parse(content);
	console.log("Here is the list of Quizzes Available");
	console.log('Enter takequiz <quiz-name> to start taking quiz');
	for (var i = 0; i < Object.keys(obj).length; i++) {
		console.log(Object.keys(obj)[i]);
	}
}

module.exports.listquiz = listquiz;



/**
* Import a list of quizzes from a specified path and output a success message if
* the file was imported successfully
*/
function importquiz(path) {
	var output = {};

	try {
		var content = fs.readFileSync(path, 'utf8');
	}
	catch(err) {
		return console.error("No file has been specified, enter a valid path to a quiz");
	}

	var content2 = fs.readFileSync('local_repo.json', 'utf8');
	var obj = JSON.parse(content);
	var obj2 = JSON.parse(content2);

	output = jsonConcat(output, obj);
	output = jsonConcat(output, obj2);

	fs.writeFile('./local_repo.json', JSON.stringify(output), 'utf-8', function(err) {
		if (err) throw err
		console.log('File imported successfully!');
	})
}

module.exports.importquiz = importquiz;



/**
* This function merges the imported json object of quizzes with local json library
*/
function jsonConcat(o1, o2) {
	for (var key in o2) {
		o1[key] = o2[key];
	}
	return o1;
}


/**
*  This function perform a Quiz process 
* @param The name of an existing quiz in the local library
* It uses the Time parameter passed into the JSON to calculate the alloted
* time for a quiz, and breaks the quiz flow if the time elapses.
*/
function takequiz(quiz) {
   var contents = fs.readFileSync("local_repo.json");
   var jContent = JSON.parse(contents);
   var abb = jContent[quiz];
	

   try {
   	console.log("You have " +abb[abb.length - 1].Time+ " secs for this quiz. Starting now!!");

    var answers_right = [];
    var answer_by_user = [];
    var right_answers = 0;

    var start = new Date();
    start.setSeconds(start.getSeconds() + abb[abb.length - 1].Time);


		 for (var i = 0; i < abb.length - 1; i++) {
		     answer = readlineSync.question(ask(abb[i], i + 1), {
		         limit: ['a', 'b', 'c']
		     });
		     if ((Date.now() - Date.parse(start)) > 0) {
		         console.log(" Past time !!")
		         break;
		     }
		     answer_by_user[i] = answer;
		     if (answer == abb[i].correct) {
		         answers_right[i] = true;
		         right_answers++;
		     } else {
		         answers_right[i] = false;
		     };
		 }
 	}
 	catch(err) {
		return console.error("Enter correct quiz name, quiz doesnt exist");
	}

	var noQuestions = abb.length - 1;

    console.log('\nYou got ' + right_answers + ' / ' + noQuestions + ' correct \n');

    console.log('Right option \t\t Your answer \t\t status');

    for (var i = 0; i < answers_right.length; i++) {
        console.log(abb[i]['correct'] + ' \t\t\t ' + answer_by_user[i] + ' \t\t\t '+ answers_right[i] );
    };
}



/**
* This function outputs the Question of the console
* Its is being called by the takequiz function
*
* @ The question parameter of the JSON object
*/
function ask(ques, i) {
    return '\n' + i + ': {question}:\na : {a}\nb : {b}\nc : {c}\n'.format(ques);


}

module.exports.takequiz = takequiz;