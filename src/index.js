const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const handlebars = require('express-handlebars')
const router = require('./router')
const mongoConnect = require('../db')
const initializaPassport = require('./config/passport.config')
const passport = require('passport')

const app = express()
const port = 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))
app.use(
  session({
    store: MongoStore.create({
        mongoUrl:
        'mongodb+srv://nicolasorlandovazquez:Nicrecor525@cluster0.tikbzrp.mongodb.net/51120sesions?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: 'coderSecret',
    resave: false,
    saveUninitialized: false,
  })
)

initializaPassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

mongoConnect()

router(app)


app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})