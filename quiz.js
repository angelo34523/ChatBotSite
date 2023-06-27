const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const questions = [
  {
    question: "Qual é o personagem principal da série de jogos The Legend of Zelda?",
    answers: {
      a: "Mario",
      b: "Link",
      c: "Sonic"
    },
    correctAnswer: "b"
  },
  {
    question: "Em qual jogo da franquia Final Fantasy o protagonista se chama Cloud Strife?",
    answers: {
      a: "Final Fantasy VII",
      b: "Final Fantasy X",
      c: "Final Fantasy VI"
    },
    correctAnswer: "a"
  },
  {
    question: "Qual é o nome do encanador bigodudo criado pela Nintendo?",
    answers: {
      a: "Mario",
      b: "Luigi",
      c: "Donkey Kong"
    },
    correctAnswer: "a"
  },
  {
    question: "Qual é o primeiro jogo da série Call of Duty?",
    answers: {
      a: "Call of Duty: Modern Warfare",
      b: "Call of Duty 2",
      c: "Call of Duty"
    },
    correctAnswer: "c"
  },
  {
    question: "Em qual jogo podemos controlar o personagem Kratos, que busca vingança contra os deuses do Olimpo?",
    answers: {
      a: "God of War",
      b: "Halo",
      c: "Call of Duty"
    },
    correctAnswer: "a"
  },
  {
    question: "Qual é o nome do planeta natal dos personagens Master Chief e Cortana na série Halo?",
    answers: {
      a: "Reach",
      b: "Earth",
      c: "Sanghelios"
    },
    correctAnswer: "a"
  },
  {
    question: "Qual é o nome do encanador irmão de Mario na série Super Mario?",
    answers: {
      a: "Toad",
      b: "Luigi",
      c: "Wario"
    },
    correctAnswer: "b"
  },
  {
    question: "Em qual jogo de estratégia podemos controlar as civilizações antigas e construir um império?",
    answers: {
      a: "Overwatch",
      b: "World of Warcraft",
      c: "Civilization V"
    },
    correctAnswer: "c"
  },
  {
    question: "Qual é o nome do mascote da Sega, um ouriço azul super rápido?",
    answers: {
      a: "Tails",
      b: "Knuckles",
      c: "Sonic"
    },
    correctAnswer: "c"
  },
  {
    question: "Qual é o nome do jogo de mundo aberto em que o protagonista pode explorar a cidade fictícia de Los Santos?",
    answers: {
      a: "Grand Theft Auto V",
      b: "Red Dead Redemption 2",
      c: "The Witcher 3: Wild Hunt"
    },
    correctAnswer: "a"
  },
  {
    question: "Qual é o nome do jogo de tiro em primeira pessoa que se passa durante a Segunda Guerra Mundial?",
    answers: {
      a: "Battlefield 1",
      b: "Call of Duty: WWII",
      c: "Medal of Honor"
    },
    correctAnswer: "b"
  },
  {
    question: "Qual é o nome do jogo de luta em que personagens icônicos da Nintendo se enfrentam?",
    answers: {
      a: "Mortal Kombat",
      b: "Super Smash Bros",
      c: "Street Fighter"
    },
    correctAnswer: "b"
  },
  {
    question: "Em qual jogo podemos controlar o personagem Nathan Drake, que embarca em aventuras arqueológicas?",
    answers: {
      a: "Uncharted",
      b: "Tomb Raider",
      c: "Assassin's Creed"
    },
    correctAnswer: "a"
  },
  {
    question: "Qual é o nome do jogo de construção em que os jogadores podem criar seu próprio mundo usando blocos?",
    answers: {
      a: "Apex Legends",
      b: "Fortnite",
      c: "Minecraft"
    },
    correctAnswer: "c"
  },
  {
    question: "Qual é o nome do jogo de construção em que os jogadores podem criar seu próprio mundo usando blocos?",
    answers: {
      a: "The Sims",
      b: "The Sims 3",
      c: "The Sims 2"
    },
    correctAnswer: "a"
  },
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
    return; // Se nenhuma opção for selecionada, não prosseguir
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
  const percentageCorrect = (numCorrect / currentQuestion) * 100;
  const resultOutput = `Você acertou ${numCorrect} de ${currentQuestion} perguntas (${percentageCorrect.toFixed(2)}%).`;
  resultsContainer.innerHTML = resultOutput;
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  resultsContainer.style.display = 'block';
}

submitButton.addEventListener('click', showNextQuestion);

buildQuiz();