var firebase = require("firebase-admin");
var fs = require('fs');
format = require('string-format');
format.extend(String.prototype);

var serviceAccount = require("./service-account.json");

firebase.initializeApp({
 credential: firebase.credential.cert(serviceAccount),
 "databaseURL": "https://test-project-faaab.firebaseio.com"
});

var ref = firebase.database().ref();

function publishQuiz(quizname) {
	var quiz = {};
	var flag = false;

	var content = fs.readFileSync('./publish_file.json', 'utf8');
	var json = JSON.parse(content);


	for (var i = 0; i < Object.keys(json).length; i++) {
			if (Object.keys(json)[i] === quizname) {
				quiz[quizname] = json[quizname];
				flag = false;
				break;
				//console.log(quiz);
				//return quiz
			}
			else {
				flag = true;
			}
	}
	if (flag === true) {

		console.error("No quiz with name exists, Enter ");
		process.exit(1);
	}

	//console.log(quiz);		

	ref.child("-KiE_c4kvyHxx12V4Xpi").update(quiz)
		.then(function (snap) {
	 	console.log("Quiz was published successfully");
	 	process.exit(1);

	})
}

module.exports.publishquiz = publishQuiz;

function publishFile(path) {
	var content = fs.readFileSync(path, 'utf8');
	var json = JSON.parse(content);

	ref.child("-KiE_c4kvyHxx12V4Xpi").update(json)
		.then(function (snap) {
	 	console.log("File was published successfully");
	 	process.exit(1);

	});
}

module.exports.publishfile = publishFile;



/**
* Get the Quizzes available of the firebase repo
*	
* Makes a call to the dQuiz function
*/
var downloadQuiz = function(quizname) {
	ref.once('value')
	 .then(function (snap) {
	 	snap.forEach(function(childSnap) {
	 		//console.log('Result', childSnap.val());
	 		dQuiz(childSnap.val(), quizname);
	 	});
	 
	 })
	 .then(function (snap) {
	 	console.log("Quiz downloaded successfully");
	 	//firebase.database().goOffline();
	 	process.exit("end");

	 })
	 .catch(function(error) {
	 	console.log(error);
	 })

}

module.exports.downloadquiz = downloadQuiz;


/**
* List the quick available on firebase
*	
* Makes a call to the listOnleQuiz function
*/
function listoQuiz() {
	ref.once('value')
	 .then(function (snap) {
	 	console.log("Here is a list of the Quizzes we have available online");
	 	snap.forEach(function(childSnap) {
	 		//console.log('Result', childSnap.val());
	 		listOnlineQuiz(childSnap.val());
	 	});
	 
	 })
	 .then(function (snap) {
	 	//firebase.database().goOffline();
	 	process.exit("end");

	 })
	 .catch(function(error) {
	 	console.log(error);
	 })

}

module.exports.listoquiz = listoQuiz;
 

function listee(jee) {
 	console.log(jee);
}


/**
* Lists the key names of the json object
*/
function listOnlineQuiz(json) {
	//var obj = JSON.parse(json);
	
	for (var i = 0; i < Object.keys(json).length; i++) {
		console.log(Object.keys(json)[i]);
	}
}

/**
* Merges two json objects
*/
function jsonConcat(o1, o2) {
	for (var key in o2) {
		o1[key] = o2[key];
	}
	return o1;
}



/**
* Using the object gotten from the firebase repo, it merges the json object
*	with the local library json object and writes the object synchronously to the local library
* 
* @ Online json object
* @ Name of quiz available online
*/
function dQuiz(json, quizname) {
	var quiz = {};
	var output = {};
	var flag = false;
	//var obj = JSON.parse(json);
	//var quiz = {};
	try {
		for (var i = 0; i < Object.keys(json).length; i++) {
			if (Object.keys(json)[i] === quizname) {
				quiz[quizname] = json[quizname];
				flag = false;
				break;
				//console.log(quiz);
				//return quiz
			}
			else {
				flag = true;
			}
		}
		if (flag === true) {

			console.error("No quiz with name exists, enter a correct name");
			process.exit(1);
		}
	}
	catch(err) {
		return console.error("Quiz doesnt Exist online, try another quiz from the list");
	}
	//real local json repo
	var content2 = fs.readFileSync('local_repo.json', 'utf8');
	var obj2 = JSON.parse(content2);
	//var obj = JSON.parse(content);
	output = jsonConcat(output, quiz);
	output = jsonConcat(output, obj2);
	
	//write to local repo
	try {
		fs.writeFileSync('./local_repo.json', JSON.stringify(output));
		
	}
	catch(err) {
		return console.error("Download wasnt succesful");
	}
	// fs.writeFile('questions.json', JSON.stringify(output), 'utf8', function(err) {
	// 	if (err) throw err
	// 	console.log('Quiz downloaded successfully!');
	// })
	
}

//downloadQuiz("RhymesQuiz");
//listoquiz();
//console.log(quiz);
