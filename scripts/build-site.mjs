import { mkdir, writeFile } from 'node:fs/promises'

const worker = `export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const assetResponse = await env.ASSETS.fetch(request)

    if (assetResponse.status !== 404 || url.pathname.includes('.')) {
      return assetResponse
    }

    return env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request))
  },
}
`

await mkdir(new URL('../dist/server/', import.meta.url), { recursive: true })
await writeFile(new URL('../dist/server/index.js', import.meta.url), worker)
