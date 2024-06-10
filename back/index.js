const express = require('express')
require('dotenv').config()
const pool = require('./db/pool.js')
const bodyParser = require('body-parser')
const cors = require('cors')

const userRouter = require('./routes/user.routes.js')
const commentsRouter = require('./routes/comment.routes.js')
const requestRouter = require('./routes/request.routes.js')

const app = express()
const PORT = process.env.PORT || 4242

app.use(cors())
app.use(express.json({ extended: true }))
app.use(bodyParser.json())
app.use('/api/users', userRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/requests', requestRouter)

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
