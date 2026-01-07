const audioBtn = document.getElementById("audioBtn");
const choicesBox = document.getElementById("choices");
const verifyBtn = document.getElementById("verifyBtn");

const question = {
  audio: "hello",
  options: ["hello", "hi", "my", "me"],
  answer: "hello"
};

let selected = null;

function speak() {
  const msg = new SpeechSynthesisUtterance(question.audio);
  msg.lang = "en-US";
  msg.rate = 0.5;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

function load() {
  choicesBox.innerHTML = "";
  selected = null;
  verifyBtn.disabled = true;
  verifyBtn.classList.remove("active");

  question.options.forEach(opt => {
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

  speak();
}

verifyBtn.onclick = () => {
  if (selected === question.answer) {
    alert("Correct!");
  } else {
    alert("Try again");
  }
};

audioBtn.onclick = speak;

load();
