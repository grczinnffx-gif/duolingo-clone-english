const audioBtn = document.getElementById("audioBtn");
const choicesBox = document.getElementById("choices");
const verifyBtn = document.getElementById("verifyBtn");
const livesEl = document.querySelector(".lives");

let lives = 5;
let selected = null;
let index = 0;

/* 🧠 LISTA DE QUESTÕES (PODE VIRAR JSON DEPOIS) */
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
    options: ["good night", "good morning", "hello", "bye"],
    answer: "good morning"
  },
  {
    audio: "my name is john",
    options: ["my name is john", "nice to meet you", "how are you", "thank you"],
    answer: "my name is john"
  }
];

/* 🔀 EMBARALHAR QUESTÕES */
shuffleArray(questions);

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
      document.querySelectorAll(".choice").forEach(c =>
        c.classList.remove("selected")
      );
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
      shuffleArray(questions);
    }

    loadQuestion();
  } else {
    lives--;
    livesEl.innerHTML = `⚡ ${lives}`;

    if (lives <= 0) {
      alert("💔 No lives left. Restarting lesson.");
      lives = 5;
      index = 0;
      shuffleArray(questions);
      livesEl.innerHTML = `⚡ ${lives}`;
      loadQuestion();
    }
  }
};

/* 🔊 BOTÃO DE ÁUDIO */
audioBtn.onclick = () => {
  speak(questions[index].audio);
};

/* 🔀 FUNÇÃO SHUFFLE */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* 🚀 START */
loadQuestion();
