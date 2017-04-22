#!/usr/bin/env node

var importquiz = require('./quizfunc.js');

var data = process.argv.slice(2);
var args = [];

data.forEach(function(val) {
	args.push(val);
});

//importquiz.importquiz('questions.json');
importquiz.importquiz(args[0]);
