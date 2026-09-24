const https = require('https')
const fs = require('fs')
const next = require('next')

// Verificar se estamos em ambiente de desenvolvimento
const dev = process.env.NODE_ENV !== 'production'

if (!dev) {
  console.error('❌ Este script é apenas para desenvolvimento local. Use "pnpm start" para produção.')
  process.exit(1)
}

const hostname = 'localhost.local'
const port = 3000

// Verificar se os certificados SSL existem
const keyPath = './localhost+2-key.pem'
const certPath = './localhost+2.pem'

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error('❌ Certificados SSL não encontrados. Execute: mkcert -install && mkcert localhost.local')
  process.exit(1)
}

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
}

app.prepare().then(() => {
  https.createServer(options, (req, res) => {
    handle(req, res)
  }).listen(port, '0.0.0.0' , () => {
    console.log(`🔒 HTTPS rodando em https://${hostname}:${port}`)
  })
})
