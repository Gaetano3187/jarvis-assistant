import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' })
  }

  const { transcript } = req.body
  if (!transcript) return res.status(400).json({ error: 'Transcript mancante' })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { error } = await supabase.from('voice_logs').insert([{ transcript }])
  if (error) return res.status(500).json({ error: error.message })

  res.status(200).json({ success: true })
}
