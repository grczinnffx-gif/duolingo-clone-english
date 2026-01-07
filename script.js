const audioBtn = document.getElementById("audioBtn");
const choicesBox = document.getElementById("choices");
const verifyBtn = document.getElementById("verifyBtn");
const livesEl = document.querySelector(".lives");

let lives = 5;
let selected = null;
let index = 0;

/* 🔥 LISTA DE PERGUNTAS (DEPOIS VAI PARA JSON) */
const questions = [
  {
    audio: "hello",
    options: ["hello", "hi", "my", "me"],
    answer: "hello"
  },
  {
    audio: "thank you",
    options: ["thank you", "coffee", "passport", "hotel"],
    answer: "thank you"
  },
  {
    audio: "good morning",
    options: ["good night", "good morning", "good afternoon", "hello"],
    answer: "good morning"
  },
  {
    audio: "my name is john",
    options: ["my name is john", "nice to meet you", "how are you", "thank you"],
    answer: "my name is john"
  }
];

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

  q.options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "choice";
    div.textContent = opt;
    div.onclick = () => {
      document.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
      div.classList.add("selected");
      selected = opt;
      verifyBtn.disabled = false;
      verifyBtn.classList.add("active");
    };
    choicesBox.appendChild(div);
  });

  speak(q.audio);
}

/* ✅ VERIFICAR */
verifyBtn.onclick = () => {
  const q = questions[index];

  if (!selected) return;

  if (selected === q.answer) {
    index++;

    if (index >= questions.length) {
      alert("🎉 Lesson completed!");
      index = 0;
    }

    loadQuestion();
  } else {
    lives--;
    livesEl.innerHTML = `⚡ ${lives}`;

    if (lives <= 0) {
      alert("💔 No lives left. Restarting lesson.");
      lives = 5;
      index = 0;
      livesEl.innerHTML = `⚡ ${lives}`;
    }
  }
};

/* 🔊 BOTÃO DE ÁUDIO */
audioBtn.onclick = () => {
  speak(questions[index].audio);
};

/* 🚀 START */
loadQuestion();
