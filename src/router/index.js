const cartsController = require ('../controller/carts/carts.controller')
const productsController = require ('../controller/products/products.controller')
const authController = require ('../controller/auth/auth.controller')
const userController = require ('../controller/users/users.controller')
const viewsTempleateController = require  ('../controller/viewsTemplate/viewsTemplate.controller')


const router = app => {
    app.use('/', viewsTempleateController)
    app.use('/api/carts', cartsController)
    app.use('/api/products', productsController)
    app.use('/api/auth', authController)
    app.use('/api/users', userController)
}

module.exports = router