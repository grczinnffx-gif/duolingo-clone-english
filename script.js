const questionEl = document.getElementById("question");
const sentenceEl = document.getElementById("sentence");
const optionsEl = document.getElementById("options");
const checkBtn = document.getElementById("checkBtn");
const audioBtn = document.getElementById("audioBtn");

let lives = 5;
let selected = null;

const question = {
  audio: "hello",
  text: "hello",
  options: ["hello", "hi", "my", "me"],
  answer: "hello"
};

function playAudio() {
  const msg = new SpeechSynthesisUtterance(question.audio);
  msg.lang = "en-US";
  msg.rate = 0.5;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

function loadQuestion() {
  sentenceEl.textContent = "Listen carefully";
  optionsEl.innerHTML = "";
  selected = null;
  checkBtn.classList.remove("active");
  checkBtn.disabled = true;

  question.options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => {
      document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
      div.classList.add("selected");
      selected = opt;
      checkBtn.classList.add("active");
      checkBtn.disabled = false;
    };
    optionsEl.appendChild(div);
  });

  playAudio();
}

audioBtn.onclick = playAudio;

checkBtn.onclick = () => {
  if (selected === question.answer) {
    sentenceEl.textContent = "✅ Correct!";
  } else {
    lives--;
    document.getElementById("lives").textContent = lives;
    sentenceEl.textContent = "❌ Try again";
  }
};

loadQuestion();
