var points = 0;
var correct = 0;
var score = 0;
var test, test_status, question, choice, chA, chB, chC, chD;
var startQuiz = document.getElementById("start-button")
var pauseQuiz = document.querySelector("#pause-button")
var timeLeft = 3;
var choices = document.getElementsByName("choices");
var questions = [
    {
        question: "Who is the Actor for Iron Man in Avengers?",
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

// for the username
function setcookie() {
    var name = prompt("Please enter your name");
    document.cookie = "name=" + name + "; expires=Thu, 18 Dec 2021 12:00:00 GMT";
    var currentScore = document.getElementById("currentScore").innerHTML = "<h2>"+name+" 's Current Score: "+correct+"</h2>";
}

function currentScore() {
    if(choice === questions[points].answer) {score++;}
}

function startTimer() {

    var begin = setInterval(function()
    {
        if(timeLeft <= 0) {
            clearInterval(begin); (document.getElementById("timer").innerHTML = "FINISHED"),(alert("QUIZ TIME ENDED!")), (document.getElementById("test").innerHTML = "<h2>Please Try Again</h2><a href='index.html'><button type='button' name='start' id='start-button'>RETRY</button></a>");
            } else { 
                (document.getElementById("timer").innerHTML = timeLeft + " seconds remaining");
        }
            timeLeft -= 1;
        }, 1000);
}

//starting the quiz with a timer
function start() {

    setcookie();
    createQuestion();
    startTimer();
}   

// this get function is short for the getElementById function  
function get(x){
    return document.getElementById(x);
}

// this function renders a question for display on the page
function createQuestion(){
    test = get("test");
    if(points >= questions.length){
      test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
      get("test_status").innerHTML = "Test completed";
      // resets the variable to allow users to restart the test
      points = 0;
      correct = 0;
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
    test.innerHTML += "<input class='hidden' type='checkbox' id='check0' value='A' name='choices'><label for='check0'><div class='btn-check0 btn-style'> "+chA+"</div></label><br>";
    test.innerHTML += "<input class='hidden' type='checkbox' id='check1' value='B' name='choices'><label for='check1'><div class='btn-check1 btn-style'> "+chB+"</div></label><br>";
    test.innerHTML += "<input class='hidden' type='checkbox' id='check2' value='C' name='choices'><label for='check2'><div class='btn-check2 btn-style'> "+chC+"</div></label><br>"
    test.innerHTML += "<input class='hidden' type='checkbox' id='check3' value='D' name='choices'><label for='check3'><div class='btn-check3 btn-style'> "+chD+"</div></label><br><br>";
    test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}

function checkAnswer(){
    for(var i=0; i<choices.length; i++){
      if(choices[i].checked){
        choice = choices[i].value;
      }
    }
    // checks if answer matches the correct choice
    if(choice == questions[points].answer){
      //each time there is a correct answer this value increases
      correct++;
    } else {
        (alert("INCORRECT, TIME DEDUCTED BY 10s")), timeLeft -= 10;
    }
    // changes position of which character user is on
    points++;
    // then the createQuestion function runs again to go to next question
    createQuestion();
}
  
// Add event listener to call createQuestion when start quiz is clicked
startQuiz.addEventListener("click", start);

