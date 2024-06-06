const express = require('express')
const path = require('path')
require('dotenv').config()
const pool = require('./db/pool.js')

const userRouter = require('./routes/user.routes.js')

const app = express()
const PORT = process.env.PORT || 4242

app.use(express.json({ extended: true }))
app.use('/api/users', userRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    app.listen(PORT, () => console.log(`hello,worlds from ${PORT}`))

    await pool.connect()
  } catch (e) {
    console.log('Server error', e.message)
    return
  }
}

start()
