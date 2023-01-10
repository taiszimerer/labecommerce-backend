// atualização branch typescript-ii

import { TProduct, TUser, TPurchase, CATEGORY} from "./types";

export let users: TUser[] = [
    {
        id: "u1",
        email: "taiszimerer@gamil.com",
        password: "1452"
    },

    {
        id: "u2",
        email: "user2@email.com",
        password: "14s5"
    }
]

//1 criar user
export function createUser(id: string, email: string, password: string) : void {
    const newUser: TUser = {
        id: id,
        email: email,
        password: password
    }
        users.push(newUser)
    console.log("Cadastro realizado com sucesso")
}

//2 pegar tds users
export function getAllUsers(): TUser[] {
    return users
}






export const products: TProduct[] = [
    {
        id: "p1",
        name: "brinco",
        price: 45,
        category: CATEGORY.ACCESSORIES
    },

    {
        id: "p2",
        name: "celular",
        price: 55,
        category: CATEGORY.ELECTRONICS
    }
]

// 3 criar novo produto 
export function createProduct(id: string, name: string, price: number, category: CATEGORY) {
    const newProduct: TProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }
    products.push(newProduct)
    console.log("Produto criado com sucesso")
}

// 4 ver todos os produtos
export function getAllProducts(): TProduct[] {
    return products
}

//5 buscar produto pelo id
export function getProductById(idToSearch: string): TProduct[] | undefined {
    return (products.filter((product) => {
        if (product.id === idToSearch) {
            return product
        }
    }))
}

// 6 buscar pelo nome
export function queryProductsByName(q: string){
    const query = products.filter(
        (product) => {
            return (product.name.toLowerCase().includes(q.toLowerCase()))
        }
    )
    console.table(query)
}






export const purchase: TPurchase[] = [
    {
        userId: "a001",
        productId: "baralho",
        quantity: 2,
        totalPrice: 22
    },
    {
        userId: "a002",
        productId: "jogo",
        quantity: 10,
        totalPrice: 56
    }


]

//7 criar purchase
export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number) {

    const newPurchase: TPurchase = {

        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    }
    purchase.push(newPurchase)
    console.log("Compra realizada com sucesso")
    console.table(purchase)
}

// 8 buscarPurchase
export const getAllPurchaseFromUserId = (userIdToSearch: string): TPurchase[] => {
    return purchase.filter(
        (purchase) => {
            return (purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase()))
        }
    )
}


