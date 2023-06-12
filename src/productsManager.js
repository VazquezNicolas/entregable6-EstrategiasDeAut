const fs= require('fs')

class ProductManager {  

    constructor (path) {
        this.products = [];
        this.path = path
        this.id = 0;
    }

    
    addCart(){
        let cart = ({
            id:this.id,
            products:this.products,
        })

        const data = JSON.parse(fs.readFileSync(this.path), "utf-8")
        console.log(data)
        this.products = data;
        let newId = this.products.length;
        newId ++;

        if (this.products !== undefined){ 
            cart.id=newId;
            this.products.push(cart)
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log("carrito agregado")
        }else{
            cart.id ++
            fs.appendFileSync(this.path, JSON.stringify(cart))
        }
    }

    addProductToCart(respuestaCart, respuestaProdId){
        let newProduct = {
            quantity: 1,
            id: respuestaProdId,
        };

        let nuevaId = respuestaCart.id
        
        console.log(`ID Carrito ${nuevaId}`)
        console.log(`ID Producto ${respuestaProdId}`)
        
        const data = JSON.parse(fs.readFileSync(this.path), "utf-8")

        const productIndex = data.findIndex(product => product.id == nuevaId);

        if(productIndex !== -1){
            console.log(`encontro el carrito ${productIndex+1}`)
            console.log(data[productIndex].products[0])
             if(data[productIndex].products[0] == undefined){
                console.log("Carrito vacio, agrego producto")
                console.log(data[productIndex].products)
                data[productIndex].products.push(newProduct);
                console.log(data[productIndex].products[0])
                fs.writeFileSync(this.path, JSON.stringify(data));
             }else{                
                const productIdCart = data[productIndex].products.findIndex(product => product.id == respuestaProdId);
                console.log(`Carrito con producto, buenco el prod con id: ${productIdCart} `)
                if(productIdCart !== -1){
                    console.log(`Existe el prod con id:${productIdCart}, quantity ++`)
                    console.log(productIdCart)
                    console.log(data[productIndex].products)
                    const posicionSuma = data[productIndex].products.findIndex(product => product.id == respuestaProdId);
                    data[productIndex].products[posicionSuma].quantity ++;
                    console.log(data[productIndex].products[posicionSuma].quantity)
                    fs.writeFileSync(this.path, JSON.stringify(data));
                }else{
                    console.log(`No xiste el prod con id:${productIdCart}, push()`)
                    data[productIndex].products.push(newProduct);
                    fs.writeFileSync(this.path, JSON.stringify(data));
                }
             }
        }else{
            console.log("No se encontro Id del carrito")
        }
    }

    addProduct(title, description, price, thumbnail, code, stock, status=true, category ) {
        
        let product = ({
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            status: status,
            category: category,
            id: this.id
        })

        const data = JSON.parse(fs.readFileSync(this.path), "utf-8")

        this.products = data;
        let newId = this.products.length;
        newId++;
        if (this.products !== undefined){
            
            const chekCode = this.products.find(e => e.code == product.code)
            
            if (chekCode != undefined) {
                 console.log('error, se a colocado el mismo codigo en un producto distinto')
              } else if ( (!product.title ) || (!product.description) || (!product.price ) || (!product.code ) || (!product.stock ) || (!product.category ) || (!product.status ) ) {
                   console.log('todos los campos son obligatorios ')
              } else {
                console.log("agrego")
                product.id = newId
                this.products.push(product)
                fs.writeFileSync(this.path, JSON.stringify(this.products));
            }
        }else {
            product.id ++
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        }
    }

    getProducts(){
        const data = JSON.parse(fs.readFileSync(this.path), "utf-8")
        console.log(data);
        return data;
    }

    getProductsById(id) {
        let data = fs.readFileSync(this.path,'utf-8')
        
            data = JSON.parse(data)
            let productId = data.find(e => e.id == id)
            if(productId != undefined){
                console.log("\n")
                console.log("Producto con id ["+id+"]")
                console.log(productId)
                return productId;
            }
             else { console.log("No existe un producto con esa id");}
             return 0;
    }

    deleteProduct = async (id) => {
        try {
        let data2 = await fs.promises.readFile(this.path,'utf-8')
        
            data2 = await JSON.parse(data2)
            let productId = await data2.filter(e => e.id != id)
            let errorsito = await data2.some(e => e.id == id)


            if (errorsito == false)
            {
                error();
            }else if (productId != undefined) {
                await fs.promises.writeFile(this.path, JSON.stringify(productId))
                data2 = await fs.promises.readFile(this.path,'utf-8')
                .then(data2 => {
                    console.log("\nSe a eliminida el producto")
                    console.log("Productos Restantes:")
                    console.log(data2)
                    })
                }
        } catch(error) {
                await console.log("\nEl producto no existe")
            }
    }

   updateProduct = async (title, description, price, thumbnail, code, stock, status, category, id) => {
        const data = JSON.parse(fs.readFileSync(this.path), "utf-8")
        this.products = data;

        const productIndex = this.products.findIndex(product => product.id == id);
    
        console.log(productIndex)
        if (productIndex !== -1) {
            this.products[productIndex] = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                status,
                category
            };
    
    
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            console.log("\nSe ha modificado el producto");
            console.log("Productos actualizados:");
            console.log(this.products);
        } else {
            console.log(`No se encontró un producto con id ${id}`);
        }
    };

}

const products = new ProductManager('./src/files/products.json');
const cart     = new ProductManager ('./src/files/carts.json');

module.exports = {
    products,
    cart
}



