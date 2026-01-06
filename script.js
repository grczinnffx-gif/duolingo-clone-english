let level = localStorage.getItem("level") || "beginner";
let index = parseInt(localStorage.getItem("index")) || 0;
let points = parseInt(localStorage.getItem("points")) || 0;
let lives = parseInt(localStorage.getItem("lives")) || 5;
let words = [];

const speakBtn = document.getElementById("speakBtn");
const micBtn = document.getElementById("micBtn");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");

const input = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const progressText = document.getElementById("progressText");
const pointsText = document.getElementById("points");
const livesText = document.getElementById("lives");

loadLevel();

/* ===== LOAD LEVEL ===== */
function loadLevel() {
  fetch(`data/${level}.json`)
    .then(res => res.json())
    .then(data => {
      words = data;
      updateUI();
      speak();
    });
}

/* ===== SPEAK ===== */
function speak() {
  const msg = new SpeechSynthesisUtterance(words[index].text);
  msg.lang = "en-US";
  speechSynthesis.speak(msg);
}

/* ===== CHECK ANSWER ===== */
function checkAnswer() {
  const user = input.value.trim().toLowerCase();
  const correct = words[index].text.toLowerCase();

  if (user === correct) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    points += 10;
    index++;
    input.value = "";

    if (index >= words.length) {
      changeLevel();
    } else {
      save();
      updateUI();
      setTimeout(speak, 700);
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
      save();
      location.reload();
    }
  }
}

/* ===== CHANGE LEVEL ===== */
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

/* ===== SAVE ===== */
function save() {
  localStorage.setItem("level", level);
  localStorage.setItem("index", index);
  localStorage.setItem("points", points);
  localStorage.setItem("lives", lives);
}

/* ===== UI ===== */
function updateUI() {
  progressText.textContent = `${level.toUpperCase()} — ${index + 1} / ${words.length}`;
  pointsText.textContent = points;
  livesText.textContent = lives;

  document.getElementById("lv-beginner").style.opacity = level === "beginner" ? "1" : "0.4";
  document.getElementById("lv-intermediate").style.opacity = level === "intermediate" ? "1" : "0.4";
  document.getElementById("lv-advanced").style.opacity = level === "advanced" ? "1" : "0.4";
}

/* ===== RESET ===== */
resetBtn.onclick = () => {
  if (confirm("Reset all progress?")) {
    localStorage.clear();
    location.reload();
  }
};

/* ===== EVENTS ===== */
speakBtn.onclick = speak;
checkBtn.onclick = checkAnswer;

/* ===== MICROPHONE ===== */
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
