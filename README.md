# Jarvis Assistant

## Descrizione breve
Assistente personale web per la gestione spese, liste e scorte

## Funzionalità
- Interfaccia React + Tailwind
- Collegamento GPT-4o via Assistant API
- Liste spesa (supermercato e online)
- Riconoscimento vocale e risposte GPT
- Stato scorte e prodotti in scadenza
- Menu laterale: OCR, esporta, grafici, stipendi

## Requisiti
- Node.js >= 18
- Chiave OpenAI

## Setup locale
```bash
npm install
npm run dev
```

## Variabili `.env.local` necessarie
```env
OPENAI_API_KEY=
ASSISTANT_ID=
```

## Deploy
- Inserisci `.env.local` su Vercel
- Collegamento 1-click per deploy
