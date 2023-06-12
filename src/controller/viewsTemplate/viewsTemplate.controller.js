const {Router} = require('express')
const privateAccess = require('../../middlewares/privateAccess.middelwares')
const publicAccess = require('../../middlewares/publicAccess.middlewares')

const router = Router()

router.get('/', privateAccess, (req,res) => {
    const {user} = req.session
    res.render('profile.handlebars', {user})
})

router.get('/signup', publicAccess, (req,res) => {  
    res.render('signUp.handlebars')
})

router.get('/login', publicAccess, (req,res) => {
    res.render('login.handlebars')
})

router.get('/notAuthorized', publicAccess, (req, res) => {
    res.render('notAuthorized.handlebars')
  })
  
  router.get('/forgotPassword', (req, res) => {
    res.render('forgotPassword.handlebars')
  })
  
module.exports = router