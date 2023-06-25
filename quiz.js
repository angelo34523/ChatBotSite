const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const questions = [
  {
    question: "Qual é a capital da França?",
    answers: {
      a: "Londres",
      b: "Paris",
      c: "Madrid"
    },
    correctAnswer: "b"
  },
  {
    question: "Quem pintou a Mona Lisa?",
    answers: {
      a: "Leonardo da Vinci",
      b: "Pablo Picasso",
      c: "Vincent van Gogh"
    },
    correctAnswer: "a"
  },
  {
    question: "Qual é a maior montanha do mundo?",
    answers: {
      a: "Monte Everest",
      b: "Monte Kilimanjaro",
      c: "Monte Fuji"
    },
    correctAnswer: "a"
  },
  // adicione mais perguntas aqui
];

function buildQuiz() {
  const output = [];

  questions.forEach((currentQuestion, questionNumber) => {
    const answers = [];

    for (letter in currentQuestion.answers) {
      answers.push(
        `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} : ${currentQuestion.answers[letter]}
         </label>`
      );
    }

    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
       <div class="answers"> ${answers.join('')} </div>`
    );
  });

  quizContainer.innerHTML = output.join('');
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.answers');

  let numCorrect = 0;

  questions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;

      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    else {
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  resultsContainer.innerHTML = `${numCorrect} de ${questions.length} perguntas corretas.`;
}

buildQuiz();

submitButton.addEventListener('click', showResults);