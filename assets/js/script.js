var points = 0;
var correct = 0;
var score = 0;
var test, test_status, question, choice, chA, chB, chC, chD;
var startQuiz = document.getElementById("start-button");
var playerEl = document.getElementById("player-name");
var submitname = document.getElementById("submit-name");
var timeLeft = 60;
var log = 0;

var choices = document.getElementsByName("choices");
var questions = [
    {
        question: "Who is the Actor for Ironman in Avengers?",
        a: "Chris Hemsworth",
        b: "Robert Downy Jr.",
        c: "Tom Hiddleton",
        d: "Brad Pitt",
        answer: "B"
    },
    {
        question: "Who is the big green Avenger?",
        a: "Black Widow",
        b: "Captain America",
        c: "The Hulk",
        d: "Spiderman",
        answer: "C"
    },
    {
        question: "What is Supermans weakness?",
        a: "Kryptonite",
        b: "Icecream",
        c: "Rocks",
        d: "Water",
        answer: "A"
    } 
];

function startTimer() {

    var begin = setInterval(function()
    {
        if(timeLeft <= 0) {
            clearInterval(begin); (document.getElementById("timer").innerHTML = "FINISHED"),(alert("QUIZ ENDED!")), (document.getElementById("test").innerHTML = "<h2>Play Again?</h2><a href='index.html'><button type='button' name='start' id='start-button'>RETRY</button></a>");
            } else { 
                (document.getElementById("timer").innerHTML = timeLeft + " seconds remaining");
        }
            timeLeft -= 1;
        }, 1000);
}

function logName() {

    var playerNameInput = document.querySelector("input[name='player-name']").value;

    if (!playerNameInput) {
        alert("You need to enter a Player Name!");
        return false;
    } else {

    var key = localStorage.key(log);
    var playername = localStorage.setItem(log, playerNameInput);
    var current = localStorage.getItem(log);

    document.getElementById("history").innerHTML = "Player Name: "+current;


    log++;
    return log;
    
    }
}

//starting the quiz with a timer
function start() {

    var playerNameInput = document.querySelector("input[name='player-name']").value;

    if (!playerNameInput) {
        alert("You need to enter a Player Name!");
        return false;
    } else {
        createQuestion();
        startTimer();
    }
}


// this get function is short for the getElementById function  
function get(x){
    return document.getElementById(x);
}

// this function renders a question for display on the page
function createQuestion(){
    var currentScore = document.getElementById("currentScore").innerHTML = "<h2>Your Current Score: "+correct+"</h2>";
    test = get("test");
    if(points >= questions.length){
      test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
      get("test_status").innerHTML = "Test completed";
      // resets the variable to allow users to restart the test
      points = 0;
      correct = 0;
      alert("Test Completed")
      // stops rest of createQuestion function running when test is completed
      return false;
    }
    get("test_status").innerHTML = "Question "+(points+1)+" of "+questions.length;
    
    question = questions[points].question;
    chA = questions[points].a;
    chB = questions[points].b;
    chC = questions[points].c;
    chD = questions[points].d;
    // display the question
    test.innerHTML = "<h3>"+question+"</h3>";
    // display the answer options
    // the += appends to the data we started on the line above
    test.innerHTML += "<input class='hidden' type='checkbox' onclick='selectOne(this.id)' id='0' value='A' name='choices'><label for='0'><div class='btn-check0 btn-style' id='check0' onclick='choice0(this.id)'> "+chA+"</div></label><br>";

    test.innerHTML += "<input class='hidden' type='checkbox' onclick='selectOne(this.id)' id='1' value='B' name='choices'><label for='1'><div class='btn-check1 btn-style' id='check1' onclick='choice1(this.id)'> "+chB+"</div></label><br>";

    test.innerHTML += "<input class='hidden' type='checkbox' onclick='selectOne(this.id)' id='2' value='C' name='choices'><label for='2'><div class='btn-check2 btn-style' id='check2' onclick='choice2(this.id)'> "+chC+"</div></label><br>"

    test.innerHTML += "<input class='hidden' type='checkbox' onclick='selectOne(this.id)' id='3' value='D' name='choices'><label for='3'><div class='btn-check3 btn-style' id='check3' onclick='choice3(this.id)'> "+chD+"</div></label><br><br>";

    test.innerHTML += "<button id='submit-response' onclick='checkAnswer()'>Submit Answer</button>";
}

// change option0 to light blue
function choice0(id) {
    document.getElementById(id).style.backgroundColor = "lightblue";
    document.getElementById("check1").style.backgroundColor = "white";
    document.getElementById("check2").style.backgroundColor = "white";
    document.getElementById("check3").style.backgroundColor = "white";
}

// change option1 to light blue
function choice1(id) {
    document.getElementById(id).style.backgroundColor = "lightblue";
    document.getElementById("check0").style.backgroundColor = "white";
    document.getElementById("check2").style.backgroundColor = "white";
    document.getElementById("check3").style.backgroundColor = "white";
}

// change option2 to light blue
function choice2(id) {
    document.getElementById(id).style.backgroundColor = "lightblue";
    document.getElementById("check0").style.backgroundColor = "white";
    document.getElementById("check1").style.backgroundColor = "white";
    document.getElementById("check3").style.backgroundColor = "white";
}

// change option3 to light blue
function choice3(id) {
    document.getElementById(id).style.backgroundColor = "lightblue";
    document.getElementById("check0").style.backgroundColor = "white";
    document.getElementById("check1").style.backgroundColor = "white";
    document.getElementById("check2").style.backgroundColor = "white";
}

// to select only ONE choice
function selectOne(id) {

    for (var i = 0; i < choices.length; i++) 
    {
        document.getElementById(i).checked = false;
    }
    document.getElementById(id).checked = true;
}

// loops createQuestion() to verify correct answers
function checkAnswer(){
    
    for(var i = 0; i < choices.length; i++)
    {
        if(choices[i].checked)
    {
        choice = choices[i].value;
    }
    }
    // checks if answer matches the correct choice
    if(choice == questions[points].answer){
      //each time there is a correct answer this value increases
      correct++, points++, createQuestion(); 
        } else {
            (alert("INCORRECT, TIME DEDUCTED BY 10s, TRY AGAIN")), timeLeft -= 10;
}
}
  
// Add event listener to call createQuestion when start quiz is clicked
startQuiz.addEventListener("click", start);
submitname.addEventListener("click", logName);

