// variables
var game;
var counter = 0;
var clock;
var timer = 30;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

$(document).ready(function () {
    // Start the game when that start button is clicked
    $('.answers').css('visibility', 'hidden');
    $('body').on('click', '.start-btn', function (event) {
        event.preventDefault();
        startGame();
        $('.answers').css('visibility', 'visible');
    });

    $('body').on('click', '.answer', function (event) {
        // console.log($(this));
        chosenAnswer = $(this).text();
        var answerCounter = questions[counter].answers;

        var answer = $('.answer');
        for (var i = 0; i < answerCounter.length; i++) {
            if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
                clearInterval(clock);
                var right = $(this).attr('class', 'right-answer answer');
                rightAnswer();
            } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
                clearInterval(clock);
                $(this).attr('class', 'wrong-answer answer');
                $('.first-answer').css('background-color', 'green');
                $('.first-answer').css('color', 'white');
                wrongAnswer();
            }
        }
    });

    $('body').on('click', '.reset-button', function (event) {
        event.preventDefault();
        resetGame();
    });
});

function rightAnswer() {
    correctCounter++;
    $('.time').html(timer);
    $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
    setTimeout(questionCounter, 2000);
}

function wrongAnswer() {
    incorrectCounter++;
    $('.time').html(timer);
    $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
    setTimeout(questionCounter, 2000);
}

function unanswered() {
    unanswered++;
    $('.main').append("<p class='times-up'>Time's up!</p>");
    $('.right-answer').css('background-color', 'green');
    $('.times-up')
        .delay(2000)
        .fadeOut(400);
    setTimeout(questionCounter, 2000);
}

// Start game
function startGame() {
    $('.start-page').css('display', 'none');
    $('.questions-page').css('visibility', 'visible');
    $('.timer').html('<p>Time remaining: <span class="time">30</span></p>');

    $('.question').html(questions[counter].question);
    var showingAnswers =
        '<p class="answer first-answer">' +
        questions[counter].answers[0].answer +
        '</p><p class="answer">' +
        questions[counter].answers[1].answer +
        '</p><p class="answer">' +
        questions[counter].answers[2].answer +
        '</p><p class="answer">' +
        questions[counter].answers[3].answer +
        '</p>';

    $('.answers').html(showingAnswers);

    timerHolder();
}

function questionCounter() {
    if (counter < 6) {
        counter++;
        startGame();
        timer = 30;
        timerHolder();
    } else {
        finishGame();
    }
}

// Timer function
function timerHolder() {
    clearInterval(clock);
    clock = setInterval(seconds, 1000);
    function seconds() {
        if (timer === 0) {
            clearInterval(clock);
            unanswered();
        } else if (timer > 0) {
            timer--;
        }
        $('.time').html(timer);
    }
}

// Finishing game
function finishGame() {
    var final = $('.main')
        .html("<p>You finished! Check out your score!<p><br><br>")
        .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
        .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
    $(final).attr('<div>');
    $(final).attr('class', 'final');
    $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
}

// Reset game
function resetGame() {
    counter = 0;
    correctCounter = 0;
    incorrectCounter = 0;
    unansweredCounter = 0;
    timer = 30;
    startGame();
    timerHolder();
}
