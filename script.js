const words = [
  "hello",
  "good morning",
  "thank you",
  "sorry",
  "apple",
  "water",
  "book",
  "friend",
  "family",
  "school"
];

let currentIndex = parseInt(localStorage.getItem("level")) || 0;

const speakBtn = document.getElementById("speakBtn");
const checkBtn = document.getElementById("checkBtn");
const input = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const progressText = document.getElementById("progressText");

updateProgress();

function speakWord() {
  const text = words[currentIndex];
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function checkAnswer() {
  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswer = words[currentIndex];

  if (userAnswer === correctAnswer) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";

    currentIndex++;
    localStorage.setItem("level", currentIndex);

    input.value = "";

    if (currentIndex < words.length) {
      updateProgress();
      setTimeout(speakWord, 800);
    } else {
      feedback.textContent = "🏆 Level completed!";
    }
  } else {
    feedback.textContent = "❌ Try again";
    feedback.style.color = "red";
  }
}

function updateProgress() {
  progressText.textContent = `Word ${currentIndex + 1} of ${words.length}`;
}

speakBtn.addEventListener("click", speakWord);
checkBtn.addEventListener("click", checkAnswer);
