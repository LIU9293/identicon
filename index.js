const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const compression = require('compression')
const app = express()
const icon = require('./icon')

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use(compression())

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/identicon/:address', async (req, res) => {
  try {
    const address = req.params.address
    const svg = await icon.svg(address, true)
    res.type('svg')
    res.status(200).send(svg)
  } catch (error) {
    console.log(error)
    res.status(500).send('internal error')
  }
})

app.listen(port)

console.log('node server started on port ' + port)
