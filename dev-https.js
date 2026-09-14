const https = require('https')
const fs = require('fs')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost.local'
const port = 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const options = {
  key: fs.readFileSync('./localhost+2-key.pem'),
  cert: fs.readFileSync('./localhost+2.pem'),
}

app.prepare().then(() => {
  https.createServer(options, (req, res) => {
    handle(req, res)
  }).listen(port, '0.0.0.0' , () => {
    console.log(`🔒 HTTPS rodando em https://${hostname}:${port}`)
  })
})
