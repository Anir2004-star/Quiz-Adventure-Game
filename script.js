const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const stageText = document.querySelector(".stage-text");
const levelText = document.querySelector(".level-text");
const finalMessage = document.getElementById("final-message");
const restartButton = document.getElementById("restart-btn");
const startButton = document.getElementById("start-btn");

// 🎵 Sound elements
const gameOverSound = document.getElementById("gameOverSound");
const gameOverVoice = document.getElementById("gameOverVoice");

let sessionToken = null;
let difficulty = "easy";
let stageCount = 1;
let correctCount = 0;

// decode HTML entities
function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Fetch a session token
async function fetchSessionToken() {
  const resp = await fetch("https://opentdb.com/api_token.php?command=request");
  const data = await resp.json();
  return data.token || null;
}

// Determine difficulty based on correct answers
function updateDifficulty() {
  if (correctCount < 3) difficulty = "easy";
  else if (correctCount < 6) difficulty = "medium";
  else if (correctCount < 9) difficulty = "hard";
  else difficulty = "expert";

  levelText.textContent = `Difficulty: ${difficulty.toUpperCase()} ${
    difficulty === "easy"
      ? "🌿"
      : difficulty === "medium"
      ? "🔥"
      : difficulty === "hard"
      ? "⚔️"
      : "🧠"
  }`;
}

// Fetch one trivia question
async function fetchQuestion() {
  let url = `https://opentdb.com/api.php?amount=1&type=multiple&difficulty=${difficulty}`;
  if (sessionToken) url += `&token=${sessionToken}`;

  const resp = await fetch(url);
  const data = await resp.json();

  if (data.response_code === 0 && data.results.length > 0) {
    return data.results[0];
  } else if (data.response_code === 4) {
    sessionToken = await fetchSessionToken(); // reset token if exhausted
    return fetchQuestion();
  } else {
    throw new Error("Trivia API error");
  }
}

// Show question
function showQuestion(trivia) {
  resetState();
  stageText.textContent = `Stage ${stageCount}`;
  questionElement.textContent = decodeHtml(trivia.question);

  const answers = [
    { text: decodeHtml(trivia.correct_answer), correct: true },
    ...trivia.incorrect_answers.map(a => ({ text: decodeHtml(a), correct: false }))
  ].sort(() => Math.random() - 0.5);

  answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = ans.text;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => selectAnswer(btn, ans.correct));
    optionsContainer.appendChild(btn);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  optionsContainer.innerHTML = "";
}

function selectAnswer(button, isCorrect) {
  const allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach(b => (b.disabled = true));

  if (isCorrect) {
    button.classList.add("correct");
    correctCount++;
    updateDifficulty();
    nextButton.classList.remove("hidden");
  } else {
    button.classList.add("wrong");
    playGameOverSounds();
    endGame();
  }
}

async function handleNext() {
  stageCount++;
  const trivia = await fetchQuestion();
  showQuestion(trivia);
}

function playGameOverSounds() {
  // reset and allow replay
  gameOverSound.pause();
  gameOverSound.currentTime = 0;
  gameOverVoice.pause();
  gameOverVoice.currentTime = 0;

  // small delay ensures smoother transition
  setTimeout(() => {
    gameOverSound.play().catch(err => console.log("Sound play blocked:", err));
  }, 300);

  setTimeout(() => {
    gameOverVoice.play().catch(err => console.log("Voice play blocked:", err));
  }, 1200);
}

function endGame() {
  gameScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  finalMessage.textContent = `You survived ${stageCount - 1} stages, reaching ${difficulty.toUpperCase()} level! 🏆`;
}

async function startGame() {
  sessionToken = await fetchSessionToken();
  startScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  stageCount = 1;
  correctCount = 0;
  difficulty = "easy";
  updateDifficulty();

  const trivia = await fetchQuestion();
  showQuestion(trivia);
}

nextButton.addEventListener("click", handleNext);
restartButton.addEventListener("click", () => {
  endScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});
startButton.addEventListener("click", startGame);
startScreen.classList.remove("hidden");