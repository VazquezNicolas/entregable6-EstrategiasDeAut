const express = require ('express');
const mongoConnect = require('../db');
const router = require('./router');
const handlebars = require('express-handlebars')

const app = express()
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

mongoConnect()
router(app)

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})