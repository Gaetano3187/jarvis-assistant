import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body as { message?: string };

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // 1. Crea un thread
    const thread = await openai.beta.threads.create();

    // 2. Invia il messaggio al thread
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message,
    });

    // 3. Avvia un run
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.ASSISTANT_ID!,
    });

    // Polling finché lo stato non è completato o fallito
    let runStatus = run;
    while (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
      await new Promise((r) => setTimeout(r, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, runStatus.id);
    }

    if (runStatus.status !== 'completed') {
      throw new Error('Run fallito');
    }

    // 4. Recupera i messaggi del thread
    const messages = await openai.beta.threads.messages.list(thread.id);
    const assistantMessage = messages.data.find((m) => m.role === 'assistant');

    return res
      .status(200)
      .json({ reply: assistantMessage?.content?.[0]?.text?.value || '' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Errore interno' });
  }
}
