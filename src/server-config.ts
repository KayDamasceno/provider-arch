import cors from 'cors'
import express, { json } from 'express'

const server = express()
server.use(
  cors({
    origin: 'http://localhost:3000' // allow only your React app, add other urls if you have deployments
  })
)

server.use(json())

server.get('/', (_, res) => {
  res.status(200).json({ message: 'Server is running' })
})

server.get('/auth/fake-token', (_, res) => {
  const token = `Bearer ${new Date().toISOString()}`
  return res.status(200).json({ token, status: 200 })
})

export { server }
