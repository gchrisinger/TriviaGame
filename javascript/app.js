// Questions and answers Array
var questions = [
    {
      question: 'The heart of a shrimp is located where?',
      answers: [
        { answer: 'A. In the head', value: true },
        { answer: 'B. In the Stomach', value: false },
        { answer: 'C. Shrimp do not have hearts', value: false },
        { answer: "D. In the tail", value: false }
      ]
    },
    {
      question: 'A snail can sleep for how long?',
      answers: [
        { answer: 'Snails do not sleep', value: false },
        { answer: '3 days', value: true },
        { answer: '6 hours', value: false },
        { answer: '1 month', value: false }
      ]
    },
    {
      question: 'Which animal has fingerprints so distinctive they can be confused for humans at crime scenes?',
      answers: [
        { answer: 'Orangitange', value: false },
        { answer: 'Lemur', value: false },
        { answer: 'Chimpanzee', value: false },
        { answer: 'Koala', value: true }
      ]
    },
    {
      question: 'How many noses does a slug have>',
      answers: [
        { answer: '0', value: false },
        { answer: '1', value: false },
        { answer: '2', value: false },
        { answer: "4", value: true }
      ]
    },
    {
      question: "What animal only turns left after ermerging from it's cave",
      answers: [
        { answer: 'Bernie Sanders', value: true },
        { answer: 'Spotted-tail salamander', value: false },
        { answer: 'Cave bears', value: false },
        { answer: 'Bats', value: false }
      ]
    },
    {
      question: 'Grizzly bears have been clocked running up to ...?',
      answers: [
        { answer: '15 mph ', value: false },
        { answer: '30 mph', value: true },
        { answer: '55 mph', value: false },
        { answer: 'Bears do not run; they gallop', value: false }
      ]
    },
    {
      question: 'Peregrine falcons can dive-bomb at speeds of ...',
      answers: [
        { answer: '55 mph', value: false },
        { answer: '90 mph', value: false },
        { answer: '200 mph', value: true },
        { answer: '400 mph', value: false }
      ]
    }
  ];
  
//   TODO: Global variables
  var game = 0;
  var counter = 0;
  var clock = 90;
  var timer = 30;
  var correctCounter = 0;
  var incorrectCounter = 0;
  var unansweredCounter = 0;
  
  $(document).ready(function() {
    // Start the game when that start button is clicked
    $('.answers').css('visibility', 'hidden');
    $('body').on('click', '.start-btn', function(event) {
      event.preventDefault();
      startGame();
      $('.answers').css('visibility', 'visible');
    });
  
    $('body').on('click', '.answer', function(event) {
      console.log($(this));
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
  
    $('body').on('click', '.reset-button', function(event) {
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
  
  // Start the game
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
  
//   TODO: Finish the game
  function finishGame() {
    var final = $('.main')
      .html("<p>All done, here's how you did!<p><br><br>")
      .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
      .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
    $(final).attr('<div>');
    $(final).attr('class', 'final');
    $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
  }
  
//   TODO: Reset the game
  function resetGame() {
    counter = 0;
    correctCounter = 0;
    incorrectCounter = 0;
    unansweredCounter = 0;
    timer = 30;
    startGame();
    timerHolder();
  }