import { products, users, purchases} from "./database"
import { CATEGORY, TProduct } from "./types"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'

const app = express();
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

//endpoint de teste
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong123!')
});

//getAllUsers
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db.select("*").from("users")
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//createUser
app.post('/users', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser string")
        }


        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser string")
        }

        await db("users").insert({ id, name, email, password })
        res.status(201).send("Cadastro de usuário registrado com sucesso")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})





//getAllProducts - retorna todos os produtos cadastrados
app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db.select("*").from("products")
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//SeachProducts - retornado o resultado da busca de produtos por nome.
app.get('/products/search', async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string
        const result = await db.raw(`SELECT * FROM products WHERE name = "${name}";`)

        if (name.length < 1) {
            res.status(400)
            throw new Error("Produto deve ter no minimo 1 caractere")
        }

        if (result.length < 1) {
            res.status(400)
            throw new Error("Produto nao encontrado")
        }

        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//createProduct
app.post('/products', async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body as TProduct

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

        if (typeof description !== "string") {
            res.status(400)
            throw new Error("'category' deve ser do tipo string")
        }

        if (typeof image_url !== "string") {
            res.status(400)
            throw new Error("'imageUrl' deve ser do tipo string")
        }

        await db.raw(`
        INSERT INTO products (id, name, price, description, image_url)
            VALUES (${id}, "${name}", ${price}, "${description}", "${image_url}");
        `)
        res.status(201).send("Produto cadastrado com sucesso")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//EditProductById
app.put('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined

        const result = products.find((product) => product.id === id)

        if (!result) {
            res.status(400)
            throw new Error("Produto não existente. Impossível editar")
        }

        if (typeof newName !== "string") {
            res.status(400)
            throw new Error("'email' deve ser do tipo string")
        }

        if (typeof newPrice !== "number") {
            res.status(400)
            throw new Error("'price' deve ser do tipo number")
        }

        if (typeof newDescription!== "string") {
            res.status(400)
            throw new Error("'category' deve ser do tipo string")
        }

        if (result) {
            result.name = newName || result.name
            result.price = newPrice || result.price
            result.description = newDescription || result.description
        }

        res.status(200).send("Atualização realizada com sucesso")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})




// getAllPurchases
app.get('/purchases', async (req: Request, res: Response) => {
    try {
        const result = await db.select("*").from("purchases")

        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// createPurchase
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const buyer = req.body.buyer as string
        const total_price = req.body.total_price as number
        const created_at = req.body.created_at as string
        const paid = req.body.paid as number
     

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo string")
        }

        if (typeof buyer !== "string") {
            res.status(400)
            throw new Error("'buyer' deve ser do tipo string")
        }
        if (typeof total_price !== "number") {
            res.status(400)
            throw new Error("'total_price' deve ser do tipo number")
        }

        if (typeof paid !== "number") {
            res.status(400)
            throw new Error("'paid' deve ser do tipo number")
        }

        if (typeof created_at !== "string") {
            res.status(400)
            throw new Error("'created_at' deve ser do tipo number")
        }

        await db.raw(`
        INSERT INTO purchases (id, buyer, total_price, created_at, paid)
            VALUES ("${id}", "${buyer}", ${total_price}, "${created_at}", ${paid});
        `)
        res.status(201).send("Compra cadastrada com sucesso")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//DeletePurchaseById
app.delete('/purchases/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string  

        const purchaseIndex = purchases.findIndex((purchase) => {
            return purchase.id === id
        })

        console.log("index:", purchaseIndex)
        res.status(200).send("Compra deletada com sucesso")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})


//GetPurchaseById
app.get('/purchases/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const result = purchases.find((purchase) => purchase.id === id)

        if (!result) {
            res.status(400)
            throw new Error("Compra não existente")
        }

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})