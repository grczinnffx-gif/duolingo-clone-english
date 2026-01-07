let index = 0;
let lives = 5;
let selected = null;
let data = [];

const questionTitle = document.getElementById("questionTitle");
const optionsBox = document.getElementById("options");
const feedback = document.getElementById("feedback");
const micBtn = document.getElementById("micBtn");
const sentenceBox = document.getElementById("sentenceBox");

fetch("data/beginner.json")
  .then(r => r.json())
  .then(json => {
    data = shuffle(json);
    loadQuestion();
  });

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function playAudio() {
  const q = data[index];
  const msg = new SpeechSynthesisUtterance(q.audio || q.text);
  msg.lang = "en-US";
  msg.rate = 0.5;
  speechSynthesis.speak(msg);
}

function loadQuestion() {
  const q = data[index];
  optionsBox.innerHTML = "";
  feedback.textContent = "";
  micBtn.classList.add("hidden");
  sentenceBox.textContent = "";

  if (q.type === "listen_choice") {
    questionTitle.textContent = "O que você escuta?";
    q.options.forEach(opt => createOption(opt));
    playAudio();
  }

  if (q.type === "listen_word") {
    questionTitle.textContent = "Toque no que escutar:";
    q.options.forEach(opt => createOption(opt));
    playAudio();
  }

  if (q.type === "speak_sentence") {
    questionTitle.textContent = "Fale esta frase:";
    sentenceBox.textContent = q.text;
    micBtn.classList.remove("hidden");
    playAudio();
  }
}

function createOption(text) {
  const div = document.createElement("div");
  div.className = "option";
  div.textContent = text;
  div.onclick = () => {
    document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
    div.classList.add("selected");
    selected = text;
  };
  optionsBox.appendChild(div);
}

document.getElementById("checkBtn").onclick = () => {
  const q = data[index];

  if (q.answer && selected === q.answer) {
    feedback.textContent = "✅ Correto!";
    index++;
    setTimeout(loadQuestion, 800);
  } else if (!q.answer) {
    feedback.textContent = "🎤 Falado!";
    index++;
    setTimeout(loadQuestion, 800);
  } else {
    lives--;
    feedback.textContent = "❌ Tente novamente";
    if (lives <= 0) alert("Sem vidas!");
  }
};
