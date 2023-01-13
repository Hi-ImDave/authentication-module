const express = require('express')
const http = require('http')
const colors = require('colors')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const multer = require('multer')
const nodemailer = require('nodemailer')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/database')
const cors = require('cors')

connectDB()
const app = express()
const server = http.createServer(app)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  },
})

const upload = multer({ storage: storage })

const PORT = process.env.PORT || 8000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler)
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello')
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/mail', require('./routes/mailRoutes'))

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
