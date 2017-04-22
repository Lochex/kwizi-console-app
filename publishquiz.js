#!/usr/bin/env node

var publishquiz = require("./onlinequizfunc.js");

var data = process.argv.slice(2);
var args = [];

data.forEach(function(val) {
	args.push(val);
});

publishquiz.publishquiz(args[0]);