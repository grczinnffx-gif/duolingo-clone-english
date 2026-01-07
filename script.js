const audioBtn = document.getElementById("audioBtn");
const choicesBox = document.getElementById("choices");
const verifyBtn = document.getElementById("verifyBtn");

const question = {
  audio: "hello",
  options: ["coffee", "hello", "passport", "hotel", "thank", "you"],
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

question.options.forEach(word => {
  const btn = document.createElement("div");
  btn.className = "choice";
  btn.textContent = word;

  btn.onclick = () => {
    document.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
    btn.classList.add("selected");
    selected = word;
    verifyBtn.disabled = false;
    verifyBtn.classList.add("active");
  };

  choicesBox.appendChild(btn);
});

audioBtn.onclick = speak;

verifyBtn.onclick = () => {
  alert(selected === question.answer ? "Correct!" : "Try again");
};

speak();
