#!/usr/bin/env node

var downloadquiz = require("./onlinequizfunc.js");

var data = process.argv.slice(2);
var args = [];

data.forEach(function(val) {
	args.push(val);
});

downloadquiz.downloadquiz(args[0]);