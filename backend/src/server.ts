// Create your server
import express, { Request, Response } from 'express'
import cookieSession from 'cookie-session'
import cors from 'cors'
import userRouter from './routes/user.routes'
import itemRouter from './routes/item.routes'
import dotenv from 'dotenv'
dotenv.config()

// Create server
const app = express()

// Middleware
app.use(cors({
  origin: "http://localhost:4321", // Astro port
  credentials: true // allow cookie transfer
}))
app.use(express.json())
const SIGN_KEY = process.env.COOKIE_SIGN_KEY
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY
if (!SIGN_KEY || !ENCRYPT_KEY) {
  throw new Error("Missing cookie keys!")
}
app.use(cookieSession({
  name: 'session',
  keys: [SIGN_KEY, ENCRYPT_KEY],
  maxAge: 60 * 60 * 1000
}))

// Routes
app.use('/users', userRouter)
app.use('/items', itemRouter)

app.use((req: Request, res: Response) => {
  res.status(404).send('Page not found!')
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`)
})