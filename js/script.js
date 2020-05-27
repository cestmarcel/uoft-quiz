// Defining questions
var questions = [
    {
        q: "What HTML element does your JavaScript go into?",
        a: ["<js>", "<javascript>", "<script>", "<other>"],
        v: 2
    },
    {
        q: "How do you start a FOR loop?",
        a: ["for(i=0; i<3; i++)", "FOR loop < 5", "for(loop i times, i = 5)", "<for i=5>"],
        v: 0
    },
    {
        q: "How do you open a single-line comment in JavaScript?",
        a: ["<!--", "//", "<comment>", ".comment"],
        v: 1
    },
    {
        q: "How do you correctly refer to an external script called script.js?",
        a: ["<script src=\"script.js\"></script>", "<javascript src=\"script.js\"></javascript>", "<script href=\"script.js\"></script>", "<script \"script.js\"></script>"],
        v: 0
    },
    {
        q: "In order to create a function in JavaScript, you have to type ______ :",
        a: ["function doSomething(){", "new:function", "<start>myFunction()", "<function>newFunction</function>"],
        v: 0
    },
    {
        q: "How do you correctly round the number 8.645 to the nearest whole number (integer)?",
        a: ["round(8.645)", "Math.ceil(8.645)", "roundToInteger: 8.645", "Math.round(8.645)"],
        v: 3
    },
    {
        q: "Pick the correct syntax to change the content of the following HTML element: <p id=\"example\">I am a bit of copy</p>",
        a: ["document.querySelector(\"#example\").textContent = \"Hi!\"", "document.getElementsByClassName(\"example\").textContent = \"Hi!\"", "file.querySelector(\"#example\").textContent = \"Hi!\"", "document.querySelector(\"#example\").changeText = \"Hi!\""],
        v: 0
    },
    {
        q: "How would you correctly alert \"Hi!\" to the user using JavaScript?",
        a: ["<alert>Hi!</alert>", "alert: \"Hi!\"", "alert(\"Hi!\")", "function{alert = \"Hi!\""],
        v: 2
    },
    {
        q: "How do you call a function \"startGame()\" in JavaScript?",
        a: ["call: startGame", "startGame", "startGame();", "callFunction=startGame;"],
        v: 2
    },
    {
        q: "How do you open a multi-line comment in JavaScript?",
        a: ["<!--", "//", "Multi-line comments are not possible in JavaScript", "/*"],
        v: 3
    },
    {
        q: "How do you correctly create a new variable called \"star\" and set its value to \"0\"?",
        a: ["var star = 0;", "newVariable(star): 0;", "create: star = 0:", "star(0)"],
        v: 0
    },
    {
        q: "Your JavaScript code in an external JavaScript file has to be wrapped in <script></script>:",
        a: ["Only if it has more than 50 lines of code", "No, it does not", "Yes, otherwise it will not work", "The <script> tag does not exist"],
        v: 1
    },
    {
        q: "Which of the following is an array?",
        a: ["var array = 1, 2, 3;", "var array = [1, 2, 3];", "array: 1, 2, 3", "array.1 [1], array.2 [2], array.3 [3]"],
        v: 1
    },
    {
        q: "If you choose to include JavaScript in your HTML file, what is the place to do that?",
        a: ["<head>", "<footer>", "<html>", "<body>"],
        v: 3
    },
    {
        q: "Which of the following characters indicate that you're dealing with an object?",
        a: ["<object>", "<>", "{}", "<!-- -->"],
        v: 2
    },
    {
        q: "What is the correct syntax to get a random full number (integer) between 0 and 3?",
        a: ["Math.round(Math.random() * 3)", "Math.round(Math.random() * 4)", "Math.random(4)", "randomNumber < 4"],
        v: 0
    },
    {
        q: "What does the following code do? animals[5]",
        a: ["Creates a new variable called \"animals\" and sets its value to 5", "Picks the fifth element from the \"animals\" array", "Picks the sixth element from the \"animals\" array", "Creates five variables called \"animals\""],
        v: 2
    },
    {
        q: "Which of these if statements is correct?",
        a: ["if(tip < .15){alert(\"Hi!\")}", "if<tip < .15>{alert(\"Hi!\")}", "if{tip < .15}=alert(\"Hi!\")", "IF:tip < .15 THEN: alert(\"Hi!\")"],
        v: 0
    },
    {
        q: "What does the following code do? console.log(example)",
        a: ["Prints \"example\" to the console", "Prints the value of the variable \"example\" to the console", "Saves the value of the variable \"example\" to the clipboard", "Nothing, this is invalid code in JavaScript"],
        v: 1
    },
    {
        q: "What is JavaScript?",
        a: ["An API", "A computer program", "A word to describe any script in any file", "A programming language"],
        v: 3
    }
]

// Set up the timer and timeout
var timer = 60;

function startTimer(){
var gameTimer = setInterval(function(){
    timer -= 1;
    if (timer <= 0){
        clearInterval(gameTimer);
        // Set up when endGame() gets called
        endGame();
    }
    document.getElementById("timer").textContent = `Time left: ${timer}s`;
    }, 1000);
}

// Set up timeout
var timeout;

function showCorrect(){
    timeout = setTimeout(function() { document.getElementById("feedback").textContent = ""; }, 2000);
}

function showWrong(){
    timeout = setTimeout(function() { document.getElementById("feedback").textContent = ""; }, 2000);
}

function stopFeedback(){
    clearTimeout(timeout);
}

// Set up question loop
var i = 0;
var score = 0;

if(localStorage.getItem("players") != null){
    var retrievedPlayers = localStorage.getItem("players");
    var players = JSON.parse(retrievedPlayers);
} else {
    var players = [];
}

function askQuestion(){
    document.getElementById("q").textContent = questions[i].q;
    document.getElementById("a1").textContent = questions[i].a[0];
    document.getElementById("a2").textContent = questions[i].a[1];
    document.getElementById("a3").textContent = questions[i].a[2];
    document.getElementById("a4").textContent = questions[i].a[3];
    document.getElementById("question-counter").textContent = `Question ${i+1}`;
}

// Check if user's choice is right or wrong
function validateChoice(number, event){
    var choice = number;
    event.target.blur();
    document.getElementById("feedback").style = "display: block";
    stopFeedback();
    if(choice == questions[i].v){
        document.getElementById("feedback").textContent = "Correct!";
        showCorrect();
        score++;
    } else {
        document.getElementById("feedback").textContent = "Wrong!";
        showWrong();
        timer = timer-5;
    }

    i = i + 1;
    
    // Set up when endGame() gets called
    if(i == 20){
        endGame();
    } else {
        askQuestion();
    }
}

// Start the game
function startGame(){
    i = 0;
    document.getElementById("welcome-zone").style = "display: none;";
    document.getElementById("question").style = "display: block;";
    document.getElementById("timer").style = "display: block";
    document.getElementById("header-placeholder").style = "display: none";
    document.getElementById("error").textContent = "";
    startTimer();
    askQuestion();
}

document.getElementById("startgame").addEventListener("click", startGame);

// Set up routine for ending the game
function endGame(){
    document.getElementById("question").style = "display: none;";
    document.getElementById("timer").style = "display: none;";
    document.getElementById("highscore").style = "display: block;";
    document.getElementById("score-notification").textContent = `You answered ${score} questions right, so your score is ${score}!`;
}

// Back to homepage (start) setup
function goToStart(){
    document.getElementById("welcome-zone").style = "display: block;";
    document.getElementById("question").style = "display: none;";
    document.getElementById("timer").style = "display: none";
    document.getElementById("header-placeholder").style = "display: block";
    document.getElementById("highscore").style = "display: none";
    document.getElementById("leaderboard").style = "display: none";
    timer = 60;
    document.getElementById("timer").textContent = `Time left: 60s`;
}

// View leaderboard
function viewLeaderboard(){
    document.getElementById("welcome-zone").style = "display: none;";
    document.getElementById("question").style = "display: none;";
    document.getElementById("timer").style = "display: none";
    document.getElementById("header-placeholder").style = "display: block";
    document.getElementById("highscore").style = "display: none";
    document.getElementById("leaderboard").style = "display: block";
}

// Provide leaderboard HTML to be available after refresh

if(localStorage.getItem("leaderboard") != null){
    var retrievedLeaderboard = localStorage.getItem("leaderboard");
    var leaderboard = JSON.parse(retrievedLeaderboard);
} else {
    var leaderboard;
}

// Reset table
function resetTable(){
    document.getElementById("table").innerHTML =
    `<tr>
        <th>Player</th>
        <th>Score</th>
    </tr>`;
}

// Add to leaderboard
function addToLeaderboard(event){
    var initials = document.getElementById("initials").value;
    event.preventDefault();    
    if(initials != ""){
        viewLeaderboard();
        players.push({"name": initials, "points": score});
        localStorage.setItem("players", JSON.stringify(players));
        resetTable();
        document.getElementById("initials").value = "";
        // Loop through array of players and display them in each row of the table
        for(i=0; i<players.length; i++){
            leaderboard = document.getElementById("table").innerHTML +=
            `<tr>
                <td>${players[i].name}</td>
                <td>${players[i].points}</td>
            </tr>`;
        }
        // Save innerHTML to localStorage to make leaderboard accessible even after refresh
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    } else {
        document.getElementById("error").textContent = "Please make sure to enter your initials!";
    }
}

// Clear leaderboard
function clearLeaderboard(){
    players = [];
    leaderboard = "";
    localStorage.removeItem("players");
    localStorage.removeItem("leaderboard");
    resetTable();
}

// Show leaderboard after refresh
function showLeaderboardRefresh(){
    viewLeaderboard();
    if(leaderboard){
        document.getElementById("table").innerHTML = leaderboard;
    } else {
        resetTable();
    }
}