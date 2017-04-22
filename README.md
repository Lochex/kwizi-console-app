# kwizi-console-app
Kwizi is a simple console based Quiz app.

#Precedence
So typically you want a simple desktop console app without the distraction of a browser to take simple quizzes that have a local repository.

The app has also been optimized to pull quizzes from an online repository (firebase db)

It simple, clean, and our results are instant.

#Commands
Enter start to start the app
Enter listquizzes to view a list of all the quizzes in the local repository

<Choose a particular quiz>
Enter takequiz <quiz-name> to take a particular quiz
Enter importqiz <path/to/file> to import quiz to local repository

Enter listoquiz to view a list of all the quizzes available on the online repo
Enter downloadquiz <quiz-name> to download a quiz from the online repo to your local library
Enter publishquiz <quiz-name> to publish a quiz from your local library to the online repo
Enter publishfile to publish quizzes from a local path to the online repo

#Resource Requirement
Install node globally with npm install -g to run commands from the directory without the node or *.js extensions 
