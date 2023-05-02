const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collectionName = 'carts'

const collectionsSchema = new mongoose.Schema({
    
    products: {
        type: [
            {
                 product: {
                    type: mongoose.Schema.Types.ObjectId ,
                    ref: 'products',
                 },
                 quantity: Number,
            },
        ],
        default: [],
    },
    
})
collectionsSchema.plugin(mongoosePaginate)

collectionsSchema.pre('find', function(){
    this.populate('products.product')
})

const Carts = mongoose.model(collectionName, collectionsSchema)

module.exports = Carts