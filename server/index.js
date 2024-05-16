import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const PORT = 4000

const app = express()
app.use(cors())

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('DB connect')
  })
  .catch((err) => {
    console.log('DB error', err)
  })

app.get('/', (req, res) => {
  res.status(200).json('Welcome, your app is working well')
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
