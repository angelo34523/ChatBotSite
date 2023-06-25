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

let currentQuestion = 0;
let numCorrect = 0;

function buildQuiz() {
  const currentQuestionData = questions[currentQuestion];

  const questionOutput = `
    <div class="question">${currentQuestionData.question}</div>
    <div class="answers">
      ${buildAnswers(currentQuestionData)}
    </div>
  `;

  quizContainer.innerHTML = questionOutput;
}

function buildAnswers(questionData) {
  const answers = [];

  for (letter in questionData.answers) {
    answers.push(
      `<label>
        <input type="radio" name="question" value="${letter}">
        ${letter} : ${questionData.answers[letter]}
      </label>`
    );
  }

  return answers.join('');
}

function showNextQuestion() {
  const selectedOption = document.querySelector('input[name="question"]:checked');

  if (!selectedOption) {
    return;
  }

  const userAnswer = selectedOption.value;

  if (userAnswer === questions[currentQuestion].correctAnswer) {
    numCorrect++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    buildQuiz();
  } else {
    showResults();
  }
}

function showResults() {
  const percentageCorrect = (numCorrect / questions.length) * 100;
  const resultOutput = `Você acertou ${numCorrect} de ${questions.length} perguntas (${percentageCorrect.toFixed(2)}%).`;
  resultsContainer.innerHTML = resultOutput;
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  resultsContainer.style.display = 'block';

  const container = document.querySelector('.container');
  container.firstElementChild.style.display = 'none';
  container.children[1].style.display = 'none';
}

submitButton.addEventListener('click', showNextQuestion);

buildQuiz();