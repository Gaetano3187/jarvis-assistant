import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const results: any = {}

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data, error } = await supabase.rpc('now')
    if (error) throw error
    results.supabase = { status: 'ok', server_time: data }
  } catch (e: any) {
    results.supabase = { status: 'error', message: e.message || e }
  }

  try {
    const response = await fetch(`https://api.openai.com/v1/assistants/${process.env.ASSISTANT_ID}`, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) throw new Error('OpenAI API error: ' + response.statusText)
    const data = await response.json()
    results.openai = { status: 'ok', name: data.name, model: data.model }
  } catch (e: any) {
    results.openai = { status: 'error', message: e.message || e }
  }

  res.status(200).json(results)
}
