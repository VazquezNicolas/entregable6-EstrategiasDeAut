const {Router} = require('express')
const Carts = require('../../dao/model/Cart.model ')
const Products = require('../../dao/model/Products.model');
const FilesDao = require('../../dao/files.dao');
const { products } = require('../../productsManager');

const router = Router()
const cartFile = new FilesDao('products.json')

//Mostrar todos los carritos
router.get('/', async (req,res) => {
    try {
        const cart = await Carts.findOne().populate("products.product")
        const productos = (cart.products)
        console.log(cart)
        
        console.log(productos)
        res.render('carts', {
            cart,
            title: cart._id,
            productos: productos
        })
    } catch (error) {
        res.status(400).json({status: 'error', error})
        console.log(error)
    }
})


//Agregar producto a carrito
router.put('/:cid/products/:pid', async (req,res) => {
    try {
    const {cid, pid} = req.params

    let i = 0
    let encontro = 0
    
    
    let cart = await Carts.findOne ({ _id: cid}).populate("products.product")
    let product = await Products.findOne ({ _id: pid})
    
    if(cart.products != null ){
        for ( i=0; i < cart.products.length; i++ ){
            if(cart.products[i].product._id == pid){ //El producto esta repetido

                cart.products[i].product.quantity ++ 
                encontro = 1;
                cantidad = cart.products[i].product.quantity
                if(cart.products[i].quantity == undefined || cart.products[i].quantity == null ){
                    cart.products[i].quantity = 1
                } else {
                    cart.products[i].quantity ++
                }
                let response2 = await Carts.updateOne({_id: cid}, cart)
                res.json({ message: response2})   
            }

        }
        if(encontro == 0) {
            console.log("No encontro") //El producto no esta repetido
            cart.products.push({product})
            cart.products[0].quantity = 1
            let response = await Carts.updateOne({_id: cid}, cart)
            res.json({ message: response})
        }
    }else {
        console.log("carrito vacio")
        cart.products.push({product}) //El carrito esta vacio
        cart.products[0].quantity = 1
        let response = await Carts.updateOne({_id: cid}, cart)
        res.json({ message: response})
    }
    
    } catch (error) {
        res.status(400).json({status: 'error', error})
        console.log(error)
    }
})

//Agregar carrito nuevo
router.post('/', async (req,res) => {
    try {
        const sinEstoNoFunciona = null
        const newCart = await Carts.create(sinEstoNoFunciona)   
        console.log(newCart)

        res.status(201).json({message: `Nuevo Carrito Agregado! `})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
    }
})

//Eliminar producto de un carrito
router.delete('/:cid/products/:pid', async (req,res) => {
    try {
    const {cid, pid} = req.params

    const cart = await Carts.findOne ({ _id: cid})
    const product = await Products.findOne ({ _id: pid})
    let i = 0;

        console.log(cart)

    if(cart.products.length > 0){
        while (i != -1){
            if(cart.products[i].product == pid){
                if(cart.products[i].quantity > 1){
                    cart.products[i].quantity --
                }
                else if(cart.products[i].quantity == 1 || cart.products[i].quantity == null){
                    cart.products.splice(0,(i+1))
                }
            i = -1 //Corto el while
            }else {
                i++
            }
        }
    await Carts.updateOne({_id: cid}, cart)
    res.json({ message: "Producto eliminado"})
    }else{
    res.json({ message: "El carrito esta vacio!"})
    }
    } catch (error) {
    
        console.log(error)
        res.status(400).json({message: "No se encontro el id del producto o carrito"})
    }
})

//Eliminar todos los productos del carrito
router.delete('/:cid', async (req,res) => {
    try {
    const {cid} = req.params

    const cart = await Carts.findOne ({ _id: cid})
    cart.products = []

    await Carts.updateOne({_id: cid}, cart)

    res.json({ message: "Se a vaciado el carrito!"})
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
    }
})

module.exports = router