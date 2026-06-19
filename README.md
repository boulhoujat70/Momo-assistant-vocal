# Assistant Vocal Mistral

Assistant vocal simple en français utilisant **Mistral API**.

## Fonctionnalités

- Reconnaissance vocale avec le navigateur
- Réponse IA avec Mistral API
- Lecture vocale de la réponse
- Backend Node.js + Express
- Frontend HTML/CSS/JavaScript simple

## Installation

```bash
npm install
```

## Configuration

Copie le fichier `.env.example` vers `.env` :

```bash
cp .env.example .env
```

Ajoute ta clé API Mistral :

```env
MISTRAL_API_KEY=ta_cle_api_mistral_ici
```

## Lancer le projet

```bash
npm start
```

Puis ouvre :

```text
http://localhost:3000
```

## Développement

```bash
npm run dev
```

## Structure

```text
assistant-vocal-mistral/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── server.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Notes

La reconnaissance vocale utilise la Web Speech API. Elle fonctionne mieux sur Chrome ou Edge.

## Licence

MIT
