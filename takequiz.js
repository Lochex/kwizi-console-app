#!/usr/bin/env node

var takequiz = require('./quizfunc.js');

var data = process.argv.slice(2);
var args = [];

data.forEach(function(val) {
	args.push(val);
});

//takequiz.takequiz('MathsQuiz');
takequiz.takequiz(args[0]);
