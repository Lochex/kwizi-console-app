#!/usr/bin/env node

var publishfile = require("./onlinequizfunc.js");

var data = process.argv.slice(2);
var args = [];

data.forEach(function(val) {
	args.push(val);
});

publishfile.publishfile(args[0]);