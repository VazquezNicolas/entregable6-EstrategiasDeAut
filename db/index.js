const mongoose = require('mongoose')

const mongoConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://nicolasorlandovazquez:Nicrecor525@cluster0.tikbzrp.mongodb.net/51120DB?retryWrites=true&w=majority')
        console.log('db is connected')

    }catch (error) {
        console.error(error)
    }
}

module.exports = mongoConnect