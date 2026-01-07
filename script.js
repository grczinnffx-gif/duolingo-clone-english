const stepTitle = document.getElementById("stepTitle");
const english = document.getElementById("english");
const portuguese = document.getElementById("portuguese");
const speakBtn = document.getElementById("speakBtn");
const answerInput = document.getElementById("answerInput");
const nextBtn = document.getElementById("nextBtn");
const feedback = document.getElementById("feedback");

/* CONTEÚDO */
const lessons = [
  {
    en: "I am learning English",
    pt: "Eu estou aprendendo inglês",
    answer: "i am learning english"
  },
  {
    en: "Where is the bathroom?",
    pt: "Onde fica o banheiro?",
    answer: "where is the bathroom"
  },
  {
    en: "I would like a coffee",
    pt: "Eu gostaria de um café",
    answer: "i would like a coffee"
  }
];

let index = 0;

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.rate = 0.5;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

function loadLesson() {
  const l = lessons[index];
  stepTitle.textContent = "Listen and understand";
  english.textContent = l.en;
  portuguese.textContent = l.pt;
  answerInput.value = "";
  feedback.textContent = "";
  speak(l.en);
}

speakBtn.onclick = () => {
  speak(lessons[index].en);
};

nextBtn.onclick = () => {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correct = lessons[index].answer;

  if (!userAnswer) {
    feedback.textContent = "Type something first.";
    return;
  }

  if (userAnswer === correct) {
    feedback.textContent = "✅ Correct!";
    index++;
    if (index >= lessons.length) {
      alert("🎉 Training finished!");
      index = 0;
    }
    setTimeout(loadLesson, 800);
  } else {
    feedback.textContent = "❌ Try again.";
  }
};

loadLesson();
