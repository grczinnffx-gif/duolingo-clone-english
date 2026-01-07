const title = document.getElementById("title");
const english = document.getElementById("english");
const portuguese = document.getElementById("portuguese");
const audioBtn = document.getElementById("audioBtn");
const input = document.getElementById("input");
const actionBtn = document.getElementById("actionBtn");

const lessons = [
  {
    type: "listen_understand",
    en: "I need a coffee",
    pt: "Eu preciso de um café"
  },
  {
    type: "listen_type",
    en: "Good morning"
  },
  {
    type: "read_speak",
    en: "Nice to meet you"
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
  input.value = "";
  input.classList.add("hidden");
  portuguese.classList.add("hidden");

  if (l.type === "listen_understand") {
    title.textContent = "Listen and understand";
    english.textContent = l.en;
    portuguese.textContent = l.pt;
    portuguese.classList.remove("hidden");
    speak(l.en);
  }

  if (l.type === "listen_type") {
    title.textContent = "Listen and type";
    english.textContent = "••••••••";
    input.classList.remove("hidden");
    speak(l.en);
  }

  if (l.type === "read_speak") {
    title.textContent = "Read and speak";
    english.textContent = l.en;
    speak(l.en);
  }
}

actionBtn.onclick = () => {
  index++;
  if (index >= lessons.length) {
    alert("🎉 Session finished!");
    index = 0;
  }
  loadLesson();
};

audioBtn.onclick = () => {
  speak(lessons[index].en);
};

loadLesson();
