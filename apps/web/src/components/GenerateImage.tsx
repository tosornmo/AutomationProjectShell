import React, { useState } from 'react'

export default function GenerateImage(){
  const [prompt, setPrompt] = useState('A funny robot juggling pizzas in space')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onGenerate(e: React.FormEvent){
    e.preventDefault()
    setLoading(true)
    setError(null)
    setImage(null)
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error?.message || data?.error || 'Generation failed')
      setImage(data.image)
    } catch (err: any){
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={{maxWidth: 800}}>
      <h2>Generate a funny drawing (OpenAI)</h2>
      <form onSubmit={onGenerate} style={{display: 'flex', gap: 8, flexDirection: 'column'}}>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={3} />
        <div style={{display: 'flex', gap: 8}}>
          <button disabled={loading} type="submit">{loading ? 'Generating…' : 'Generate'}</button>
          <button type="button" onClick={() => setPrompt('A funny robot juggling pizzas in space')}>Reset prompt</button>
        </div>
      </form>

      {error && <p style={{color: 'crimson'}}>Error: {error}</p>}

      {image && (
        <div style={{marginTop: 16}}>
          <h3>Your drawing</h3>
          <img src={image} alt="Generated drawing" style={{maxWidth: '100%'}} />
        </div>
      )}
    </section>
  )
}
