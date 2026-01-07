let level = localStorage.getItem("level") || "beginner";
let index = 0; // sempre começa do 0 porque agora é aleatório
let points = parseInt(localStorage.getItem("points")) || 0;
let lives = parseInt(localStorage.getItem("lives")) || 5;

let words = [];
let shuffledWords = [];

const speakBtn = document.getElementById("speakBtn");
const micBtn = document.getElementById("micBtn");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");

const input = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const progressText = document.getElementById("progressText");
const pointsText = document.getElementById("points");
const livesText = document.getElementById("lives");
const englishText = document.getElementById("englishText");
const portugueseText = document.getElementById("portugueseText");

/* 🔤 DICIONÁRIO BÁSICO (pode crescer para 35k+) */
const dictionary = {
  "hello": "olá",
  "good morning": "bom dia",
  "thank you": "obrigado",
  "sorry": "desculpa",
  "apple": "maçã",
  "water": "água",
  "book": "livro",
  "friend": "amigo",
  "family": "família",
  "school": "escola",
  "i am learning english": "eu estou aprendendo inglês",
  "can you help me": "você pode me ajudar",
  "how are you": "como você está",
  "what is your name": "qual é o seu nome",
  "i like to study english": "eu gosto de estudar inglês"
};

loadLevel();

/* ========= LOAD LEVEL ========= */
function loadLevel() {
  fetch(`data/${level}.json`)
    .then(res => res.json())
    .then(data => {
      words = data.map(item => item.text);
      shuffledWords = shuffleArray([...words]);
      index = 0;
      updateUI();
      speak();
    });
}

/* ========= SHUFFLE (ALEATÓRIO) ========= */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* ========= SPEAK (DEVAGAR + MOSTRAR TEXTO) ========= */
function speak() {
  const text = shuffledWords[index].toLowerCase();

  englishText.textContent = shuffledWords[index];
  portugueseText.textContent = dictionary[text] || "tradução em breve";

  const msg = new SpeechSynthesisUtterance(shuffledWords[index]);
  msg.lang = "en-US";
  msg.rate = 0.5; // 🔥 MAIS DEVAGAR
  msg.pitch = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

/* ========= CHECK ANSWER ========= */
function checkAnswer() {
  const user = input.value.trim().toLowerCase();
  const correct = shuffledWords[index].toLowerCase();

  if (user === correct) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    points += 10;
    index++;
    input.value = "";

    if (index >= shuffledWords.length) {
      changeLevel();
    } else {
      save();
      updateUI();
      setTimeout(speak, 800);
    }
  } else {
    feedback.textContent = "❌ Try again";
    feedback.style.color = "red";
    lives--;
    save();

    if (lives <= 0) {
      alert("💔 No lives left. Resetting level.");
      lives = 5;
      index = 0;
      shuffledWords = shuffleArray([...words]);
      save();
      updateUI();
      speak();
    }
  }
}

/* ========= CHANGE LEVEL ========= */
function changeLevel() {
  if (level === "beginner") level = "intermediate";
  else if (level === "intermediate") level = "advanced";
  else {
    feedback.textContent = "🏆 All levels completed!";
    localStorage.clear();
    return;
  }

  index = 0;
  save();
  loadLevel();
}

/* ========= SAVE ========= */
function save() {
  localStorage.setItem("level", level);
  localStorage.setItem("points", points);
  localStorage.setItem("lives", lives);
}

/* ========= UI ========= */
function updateUI() {
  progressText.textContent = `${level.toUpperCase()} — ${index + 1} / ${shuffledWords.length}`;
  pointsText.textContent = points;
  livesText.textContent = lives;

  document.getElementById("lv-beginner").style.opacity = level === "beginner" ? "1" : "0.4";
  document.getElementById("lv-intermediate").style.opacity = level === "intermediate" ? "1" : "0.4";
  document.getElementById("lv-advanced").style.opacity = level === "advanced" ? "1" : "0.4";
}

/* ========= RESET ========= */
resetBtn.onclick = () => {
  if (confirm("Reset all progress?")) {
    localStorage.clear();
    location.reload();
  }
};

/* ========= EVENTS ========= */
speakBtn.onclick = speak;
checkBtn.onclick = checkAnswer;

/* ========= MICROPHONE ========= */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";

micBtn.onclick = () => {
  feedback.textContent = "🎙️ Listening...";
  recognition.start();
};

recognition.onresult = (e) => {
  input.value = e.results[0][0].transcript.toLowerCase();
  checkAnswer();
};
