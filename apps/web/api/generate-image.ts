import { IncomingMessage, ServerResponse } from 'http'

// Simple Vercel Serverless function to proxy OpenAI image generation.
// Expects a POST with JSON { prompt: string }
// Requires OPENAI_API_KEY in environment.

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { prompt } = req.body || {}
  if (!prompt) {
    res.status(400).json({ error: 'Missing prompt in request body' })
    return
  }

  const key = process.env.OPENAI_API_KEY
  if (!key) {
    res.status(500).json({ error: 'OPENAI_API_KEY not configured' })
    return
  }

  try {
    const resp = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt,
        size: '1024x1024',
        n: 1
      })
    })

    const data = await resp.json()

    if (!resp.ok) {
      res.status(502).json({ error: 'OpenAI error', details: data })
      return
    }

    const item = data?.data?.[0]
    if (!item) {
      res.status(502).json({ error: 'No image returned by OpenAI', details: data })
      return
    }

    if (item.b64_json) {
      const img = `data:image/png;base64,${item.b64_json}`
      res.json({ image: img })
      return
    }

    if (item.url) {
      res.json({ image: item.url })
      return
    }

    res.status(502).json({ error: 'Unexpected OpenAI response', details: data })
  } catch (err: any) {
    res.status(500).json({ error: err?.message || String(err) })
  }
}
