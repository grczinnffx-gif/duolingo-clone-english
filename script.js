let level = localStorage.getItem("level") || "beginner";
let index = parseInt(localStorage.getItem("index")) || 0;
let words = [];

const speakBtn = document.getElementById("speakBtn");
const checkBtn = document.getElementById("checkBtn");
const input = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const progressText = document.getElementById("progressText");

loadLevel();

/* ===== LOAD LEVEL ===== */
function loadLevel() {
  fetch(`data/${level}.json`)
    .then(res => res.json())
    .then(data => {
      words = data;
      updateProgress();
      speak();
    })
    .catch(() => {
      feedback.textContent = "Error loading level";
    });
}

/* ===== SPEAK ===== */
function speak() {
  const text = words[index].text;
  const msg = new SpeechSynthesisUtterance(text);
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
    index++;
    input.value = "";

    if (index >= words.length) {
      changeLevel();
    } else {
      saveProgress();
      updateProgress();
      setTimeout(speak, 700);
    }
  } else {
    feedback.textContent = "❌ Try again";
    feedback.style.color = "red";
  }
}

/* ===== CHANGE LEVEL ===== */
function changeLevel() {
  if (level === "beginner") {
    level = "intermediate";
  } else if (level === "intermediate") {
    level = "advanced";
  } else {
    feedback.textContent = "🏆 All levels completed!";
    localStorage.clear();
    return;
  }

  index = 0;
  saveProgress();
  loadLevel();
}

/* ===== SAVE ===== */
function saveProgress() {
  localStorage.setItem("level", level);
  localStorage.setItem("index", index);
}

/* ===== UI ===== */
function updateProgress() {
  progressText.textContent = `${level.toUpperCase()} — ${index + 1} / ${words.length}`;
}

speakBtn.addEventListener("click", speak);
checkBtn.addEventListener("click", checkAnswer);
