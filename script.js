const audioBtn = document.getElementById("audioBtn");
const choicesBox = document.getElementById("choices");
const verifyBtn = document.getElementById("verifyBtn");
const questionTitle = document.getElementById("questionTitle");
const sentenceEl = document.getElementById("sentence");
const livesEl = document.getElementById("lives");

let lives = 5;
let index = 0;
let selected = null;

/* 🧠 BANCO DE QUESTÕES (TIPOS MISTURADOS) */
const questions = shuffle([
  {
    type: "listen_choice",
    audio: "hello",
    options: ["hello", "hi", "my", "me"],
    answer: "hello"
  },
  {
    type: "listen_choice",
    audio: "thank you",
    options: ["coffee", "thank you", "passport", "hotel"],
    answer: "thank you"
  },
  {
    type: "tap_word",
    audio: "water",
    options: ["coffee", "water", "book", "school"],
    answer: "water"
  },
  {
    type: "speak_sentence",
    text: "Nice to meet you"
  }
]);

/* 🔊 FALAR */
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.rate = 0.5;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

/* 🔁 CARREGAR QUESTÃO */
function loadQuestion() {
  const q = questions[index];
  selected = null;
  verifyBtn.disabled = true;
  verifyBtn.classList.remove("active");
  choicesBox.innerHTML = "";
  sentenceEl.classList.add("hidden");

  if (q.type === "listen_choice") {
    questionTitle.textContent = "What do you hear?";
    q.options.forEach(opt => createChoice(opt));
    speak(q.audio);
  }

  if (q.type === "tap_word") {
    questionTitle.textContent = "Tap the word you hear";
    q.options.forEach(opt => createChoice(opt));
    speak(q.audio);
  }

  if (q.type === "speak_sentence") {
    questionTitle.textContent = "Speak this sentence";
    sentenceEl.textContent = q.text;
    sentenceEl.classList.remove("hidden");
    speak(q.text);
  }
}

/* 🔘 CRIAR OPÇÃO */
function createChoice(text) {
  const div = document.createElement("div");
  div.className = "choice";
  div.textContent = text;
  div.onclick = () => {
    document.querySelectorAll(".choice").forEach(c =>
      c.classList.remove("selected")
    );
    div.classList.add("selected");
    selected = text;
    verifyBtn.disabled = false;
    verifyBtn.classList.add("active");
  };
  choicesBox.appendChild(div);
}

/* ✅ VERIFICAR */
verifyBtn.onclick = () => {
  const q = questions[index];

  if (q.answer && selected !== q.answer) {
    lives--;
    livesEl.textContent = lives;
    if (lives <= 0) {
      alert("💔 No lives left. Restarting.");
      lives = 5;
      index = 0;
      livesEl.textContent = lives;
    }
    return;
  }

  index++;
  if (index >= questions.length) {
    alert("🎉 Lesson completed!");
    index = 0;
  }

  loadQuestion();
};

/* 🔊 BOTÃO ÁUDIO */
audioBtn.onclick = () => {
  const q = questions[index];
  speak(q.audio || q.text);
};

/* 🔀 EMBARALHAR */
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

/* 🚀 START */
loadQuestion();
