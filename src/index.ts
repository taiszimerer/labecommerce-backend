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
    res.status(200).send(users)
})

//getAllProducts
app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})


//SeachProducts
app.get('/products/search', (req: Request, res: Response)=>{
    
    const q = req.query.q as string

    const result = products.filter((product) =>{
        return product.name.toLowerCase().includes(q.toLowerCase())  //includes (q=nome da constante)
    })

    res.status(200).send(result) //send (nome da variavel)
})




//createUser
app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string

    const newUser = {
        id,
        email,
        password
    }

    users.push(newUser)
    res.status(201).send("User registrado com sucesso")
})

//createProduct
app.post('/products', (req: Request, res: Response) => {
    const { id, name, price, category } = req.body as TProduct

    const newProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso")
})

// getAllPurchases
app.get('/purchase', (req: Request, res: Response) => {
    res.status(200).send(purchase)
})

// createPurchase
  app.post('/purchase', (req: Request, res: Response)=>{
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

    purchase.push(newPurchase)
    res.status(201).send("Compra cadastrada com sucesso")
  })