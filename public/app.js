const startBtn = document.getElementById("startBtn");
const userText = document.getElementById("userText");
const assistantText = document.getElementById("assistantText");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  startBtn.disabled = true;
  startBtn.textContent = "Navigateur non compatible";
  assistantText.textContent = "Utilise Chrome ou Edge pour la reconnaissance vocale.";
}

const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.lang = "fr-FR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
}

startBtn.addEventListener("click", () => {
  if (!recognition) return;
  startBtn.disabled = true;
  startBtn.textContent = "🎧 J'écoute...";
  recognition.start();
});

recognition?.addEventListener("result", async (event) => {
  const text = event.results[0][0].transcript;
  userText.textContent = text;
  assistantText.textContent = "Réflexion...";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur API");
    }

    assistantText.textContent = data.reply;
    speak(data.reply);
  } catch (error) {
    assistantText.textContent = "Erreur : " + error.message;
  } finally {
    startBtn.disabled = false;
    startBtn.textContent = "🎤 Parler";
  }
});

recognition?.addEventListener("error", (event) => {
  assistantText.textContent = "Erreur micro : " + event.error;
  startBtn.disabled = false;
  startBtn.textContent = "🎤 Parler";
});

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
}
