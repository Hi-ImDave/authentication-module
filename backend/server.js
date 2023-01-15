const express = require('express')
const passport = require('passport')
const http = require('http')
const colors = require('colors')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const multer = require('multer')
const nodemailer = require('nodemailer')
const session = require('express-session')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/database')
const cors = require('cors')
require('./config/passport')(passport)

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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('Hello')
})

// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/mail', require('./routes/mailRoutes'))

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
