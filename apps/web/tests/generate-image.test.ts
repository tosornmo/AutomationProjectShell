import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import handler from '../api/generate-image'

function mockRes() {
  const json = vi.fn(() => undefined)
  const status = vi.fn(() => ({ json }))
  return { status, json }
}

describe('generate-image endpoint', () => {
  let OLD_ENV: any

  beforeEach(() => {
    OLD_ENV = { ...process.env }
    vi.resetAllMocks()
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  it('returns 400 when missing prompt', async () => {
    const req: any = { method: 'POST', body: {} }
    const res: any = mockRes()

    // @ts-ignore
    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status().json).toHaveBeenCalled()
  })

  it('returns 500 when OPENAI_API_KEY is not configured', async () => {
    process.env.OPENAI_API_KEY = ''
    const req: any = { method: 'POST', body: { prompt: 'hello' } }
    const res: any = mockRes()

    // @ts-ignore
    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status().json).toHaveBeenCalled()
  })

  it('returns image url when OpenAI responds with url', async () => {
    process.env.OPENAI_API_KEY = 'fake'

    const fakeResponse = { data: [{ url: 'https://example.com/img.png' }] }
    // @ts-ignore
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(fakeResponse) }))

    const req: any = { method: 'POST', body: { prompt: 'funny robot' } }
    const res: any = mockRes()

    // @ts-ignore
    await handler(req, res)

    expect(global.fetch).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith({ image: 'https://example.com/img.png' })
  })

  it('returns image data-url when OpenAI responds with b64_json', async () => {
    process.env.OPENAI_API_KEY = 'fake'

    const fakeResponse = { data: [{ b64_json: 'aGVsbG8=' }] }
    // @ts-ignore
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(fakeResponse) }))

    const req: any = { method: 'POST', body: { prompt: 'funny robot' } }
    const res: any = mockRes()

    // @ts-ignore
    await handler(req, res)

    expect(global.fetch).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith({ image: 'data:image/png;base64,aGVsbG8=' })
  })
})