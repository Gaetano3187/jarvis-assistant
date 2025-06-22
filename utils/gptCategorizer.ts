import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getCategoria(spesa: string): Promise<string> {
  const prompt = `Classifica la spesa '${spesa}' come: Casa, Vestiti, Divertimento o Varie. Rispondi solo con una di queste parole.`;
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 10,
  });
  const text = res.choices[0].message?.content?.trim().toLowerCase();
  if (!text) return 'varie';
  if (text.includes('casa')) return 'casa';
  if (text.includes('vestiti')) return 'vestiti';
  if (text.includes('divertimento')) return 'divertimento';
  return 'varie';
}
