var points = 0;
var correct = 0;
var test, test_status, question, choice, chA, chB, chC, chD;

"use strict";

let minute = 5;
let second = 0;
let millisecond = 0;

let cron;

document.clock_main.start.onclick = () => start();

function start() {
    PaymentRequest();
    cron = setInterval(() => { TimeRanges(); }, 10);
}

function timer() {
    if ((millisecond += 10) == 1000) {
        millisecond = 0;
        second ++;
    }
    if (second == 60) {
        second = 0; 
        minute++;
    }
    if (minute == 60) {minute = 0;}
}

document.getElementById('minute').innnerText = returnData(minute);
document.getElementById('second').innerText = returnData(second);
document.getElementById('millisecond').innerText = returnData(millisecond);

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
    // use getElementsByName because we have an array which it will loop through
    choices = document.getElementsByName("choices");
    for(var i=0; i<choices.length; i++){
      if(choices[i].checked){
        choice = choices[i].value;
      }
    }
    // checks if answer matches the correct choice
    if(choice == questions[points].answer){
      //each time there is a correct answer this value increases
      correct++;
    }
    // changes position of which character user is on
    points++;
    // then the createQuestion function runs again to go to next question
    createQuestion();
  }
  // Add event listener to call createQuestion on page load event
  window.addEventListener("load", createQuestion);