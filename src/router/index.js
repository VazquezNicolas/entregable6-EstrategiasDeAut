const productsController = require ('../controller/products/products.controller')
const cartsController = require ('../controller/carts/carts.controller')

const router = app => {
    app.use('/api/carts', cartsController)
    app.use('/api/products', productsController)
}

module.exports = router