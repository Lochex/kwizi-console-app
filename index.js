#!/usr/bin/env node

var chalk = require('chalk');
var clear = require('clear');
var CLI = require('clui');
var figlet = require('figlet');

function start() {
	clear();
	console.log(
		chalk.yellow(
			figlet.textSync('kWizi', { horizontalLayout: 'full' })
			), "Back to the Past!!!"
	);
	console.log("Enter " +chalk.red("listquizzes")+ " to Display the list of quizzes available");
	console.log("Enter " +chalk.red("takequiz <quiz-name>")+ " to start taking a quiz");
	console.log("Enter " +chalk.red("importquiz <path_to_quiz_JSON>")+ " to import quiz to local library");
	console.log("Enter " +chalk.red("listoquiz")+ " to list all online quizzes");
	console.log("Enter " +chalk.red("downloadquiz <quiz-name>")+ " to download a quiz from the online repo, making it available locally");
	console.log("Enter " +chalk.red("publishquiz <quiz-name>")+ " to publish a named quiz from local library to the Online repo");
	console.log("Enter " +chalk.red("publishfile")+ " to publish a whole file from local library to the Online repo");

}

module.exports.start = start
