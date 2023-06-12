const {Router} = require('express')
const Users = require('../../dao/model/Users.model')
const { passwordValidate } = require('../../utils/cryptPassword')
const passport = require('passport')
const router = Router()

router.post('/',passport.authenticate('login', {failureRedirect: '/auth/faillogin'}) ,async (req,res) => {
    try {
      //El usuario no existe
       if(!req.user) return res.status(401).json({status: 'error', error: 'Usuario y contraseña no coinciden'})

      // El usuario si existe
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email
        }
        
        res.json({message:'succes login'})
        return res.status(400).json({ message: 'Usuario logueado'}) 
        
    } catch (error) {
        console.log(error)
        res.status(500).json ({status: 'error', error: 'Internal server error'})
    }
})

router.get('/github', passport.authenticate('github', {scope: ['user: email']}),async (req,res) => {

})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req,res) => {

})

router.get('/logout', (req,res) => {
    req.session.destroy (error => {
        if(error) {return res.json({error})}
        console.log("logout")
        res.redirect('/login')
    })
})

router.patch('/forgotPassword', async (req, res) => {
    try {
      const { email, password } = req.body
      const passwordEncrypted = hashPassword(password)
      await Users.updateOne({ email }, { password: passwordEncrypted })
  
      res.json({ message: 'Password updated' })
    } catch (error) {
      res.json({ error: error.message })
    }
  })
module.exports = router