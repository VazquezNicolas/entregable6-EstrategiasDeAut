const passport = require('passport')
const local = require('passport-local')
const Users = require('../dao/model/Users.model')
const GitHubStrategy = require('passport-github2')
const { createHash, passwordValidate } = require('../utils/cryptPassword')

const LocalStrategy = local.Strategy

const initializaPassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email'}, async(req, username, passwords, done) => {
        try {
            const {first_name, last_name, email, age, password, rol} = req.body

            const user = await Users.findOne({email: username})
            if(user){
                console.log('Usuario existe')
                return done(null, false)
            }

            const newUserInfo = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                rol
            }
            newUserInfo.rol = "usuario"
    
            const newUser = await Users.create(newUserInfo)

            done(null, newUser)
        } catch (error) {
            done(error)
        }
    }
    )
)

passport.use('login', new LocalStrategy({ usernameField: 'email'}, async (username, password, done) => {
    try {
        const user = await Users.findOne({email: username})
        if(!user){
            console.log('El usuario no existe')
            return done(null, false)
        }

        if (!passwordValidate(password, user)) return done (null, false)

        done(null, user) // guarda todo en req.user
    } catch (error) {
        done(error)
    }
}))

passport.use(new GitHubStrategy({
    clientID: 'Iv1.1696d6c3627cbc01',
    clientSecret: '141618d395ce92148bef14eb004a8a53d825be65',
    callbackURL: "http://localhost:3000/api/auth/githubcallback"
  },
  async(accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile)

        const user = await Users.findOne({email: profile._json.email})
        if(!user) {
            const newUserInfo = {
                first_name: profile._json.name,
                last_name: '',
                email: profile._json.email,
                age: '18',
                rol: 'user',
                password: '',
            }
            const newUser = await Users.create(newUserInfo)
            return done(null, newUser)
        }

        done(null, user)
    } catch (error) {
        
    }
  }
));

passport.serializeUser((user, done) => {
    done(user, user.id)
})

passport.deserializeUser( async (id, done) => {
    const user = await Users.findById(id)
    done(null, user)
})
}

module.exports = initializaPassport