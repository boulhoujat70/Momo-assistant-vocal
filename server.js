import express from "express";
import cors from "cors";
import dotenv from "dotenv";

/*
  Assistant vocal avec Mistral API
  - Frontend: Web Speech API du navigateur pour écouter et parler
  - Backend: appelle Mistral API pour générer la réponse
*/

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_MODEL = process.env.MISTRAL_MODEL || "mistral-small-latest";

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message manquant." });
    }

    if (!MISTRAL_API_KEY) {
      return res.status(500).json({ error: "MISTRAL_API_KEY manquant dans .env" });
    }

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        messages: [
          {
            role: "system",
            content: "Tu es un assistant vocal utile, simple et naturel. Réponds en français, avec des réponses courtes."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas compris.";

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

app.listen(PORT, () => {
  console.log(`Assistant vocal lancé sur http://localhost:${PORT}`);
});
