import { products, users, purchase, createUser, createProduct } from "./database"
import { CATEGORY, TProduct, TPurchase } from "./types"
import express, { Request, Response } from 'express'
import cors from 'cors'


console.log("Ola deu certooo")

console.log("USERS", users)
console.log("PRODUCTS", products)
console.log("PURCHASE", purchase)

console.log(createUser, "u003", "beltrano@email.com", "beltrano99")

createProduct("p004", "tv smart", 800, CATEGORY.ELECTRONICS)
console.table(createProduct)

//config express
const app = express();
app.use(express.json())
app.use(cors())


//colocando nosso servidor para escutar a porta 3003 da nossa máquina (primeiro 
//parâmetro da função listen)
//a função de callback (segundo parâmetro da função listen) serve para sabermos 
//que o servidor está de pé, através do console.log que imprimirá a mensagem no 
//terminal 👇🏽
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

//endpoint de teste
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong123!')
});

//criando endpoint para acessar os dados
//getallUsers
app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//getAllProducts
app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


// getAllPurchases
app.get('/purchase', (req: Request, res: Response) => {
    res.status(200).send(purchase)
})


//createUser
app.post('/users', (req: Request, res: Response) => {
    try {

        const id = req.body.id as string
        const email = req.body.email as string
        const password = req.body.password as string

        const newUser = {
            id,
            email,
            password
        }

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser string")
        }

        users.push(newUser)
        res.status(201).send("User registrado com sucesso")


    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//createProduct
app.post('/products', (req: Request, res: Response) => {
    try {
        const { id, name, price, category } = req.body as TProduct

        const newProduct = {
            id,
            name,
            price,
            category
        }

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser do tipo string")
        }

        if (typeof price !== "number") {
            res.status(400)
            throw new Error("'price' deve ser do tipo number")
        }

        if (typeof category !== "string") {
            res.status(400)
            throw new Error("'category' deve ser do tipo string")
        }

        products.push(newProduct)
        res.status(201).send("Produto cadastrado com sucesso")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


// createPurchase
app.post('/purchase', (req: Request, res: Response) => {
    try {
        const userId = req.body.userId as string
        const productId = req.body.productId as string
        const quantity = req.body.quantity as number
        const totalPrice = req.body.totalPrice as number

        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        }


        if (typeof userId !== "string") {
            res.status(400)
            throw new Error("'UserId' deve ser do tipo string")
        }

        if (typeof productId !== "string") {
            res.status(400)
            throw new Error("'productId' deve ser do tipo string")
        }

        if (typeof quantity !== "number") {
            res.status(400)
            throw new Error("'quantity' deve ser do tipo number")
        }

        if (typeof totalPrice !== "number") {
            res.status(400)
            throw new Error("'totalPrice' deve ser do tipo number")
        }

        purchase.push(newPurchase)
        res.status(201).send("Compra cadastrada com sucesso")
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }


})

//SeachProducts
app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        const result = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())  //includes (q=nome da constante)
        })

        if (q.length < 1) {
            res.status(400)
            throw new Error("Produto deve ter no minimo 1 caractere")
        }

        //produto nao econtrado, quando digita qualquer coisa
        if (result.length < 1) {
            res.status(400)
            throw new Error("Produto nao encontrado")
        }

        res.status(200).send(result) //send (nome da variavel)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//GetProductsById
app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id as string

    const result = products.find((product) => product.id === id)

    res.status(200).send(result)
})

//GetUserPurchaseByUserId incompleto
app.get('/users/:id/purchase', (req: Request, res: Response) => {
    const id = req.params.id as string




    res.status(200).send()
})

//DeleteUserById
app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id as string  //salvar o id 

    const userIndex = users.findIndex((user) => {
        return user.id === id
    })

    console.log("index:", userIndex)

    //metodo para apagar dentro de um array 
    if (userIndex >= 0) {
        users.splice(userIndex, 1)
        res.status(200).send("User deletado com sucesso")
    } else {  //quando nao houver users, users=0
        res.status(404).send("User nao encontrado")
    }
})

//EditUserById
app.put('/users/:id', (req: Request, res: Response) => {

    const id = req.params.id

    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const user = users.find((user) => {
        return user.id === id
    })

    if (user) {
        // se o novo dado não foi definido, então mantém o que já existe
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }

    res.status(200).send("Atualização realizada com sucesso")
})


//DeleteProductById
app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id as string  //salvar o id 

    const productIndex = products.findIndex((product) => {
        return product.id === id
    })

    console.log("index:", productIndex)

    //metodo para apagar dentro de um array 
    if (productIndex >= 0) {
        products.splice(productIndex, 1)
        res.status(200).send("Produto deletado com sucesso")
    } else {  //quando nao houver produto, produto=0
        res.status(404).send("Produto nao encontrado")
    }
})

//EditProductById
app.put('/products/:id', (req: Request, res: Response) => {

    const id = req.params.id

    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as CATEGORY | undefined

    const product = products.find((product) => {
        return product.id === id
    })

    if (product) {
        // se o novo dado não foi definido, então mantém o que já existe
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.category = newCategory || product.category
    }

    res.status(200).send("Atualização realizada com sucesso")
})


