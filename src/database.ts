// atualização branch typescript-ii

import { toASCII } from "punycode";
import { TProduct, TUser, TPurchase, CATEGORY} from "./types";

export let users: TUser[] = [
    {
        id: "u1",
        name: "tais",
        email: "taiszimerer@gamil.com",
        password: "1452"
    },

    {
        id: "u2",
        name: "user2",
        email: "user2@email.com",
        password: "14s5"
    }
]

//1 criar user
// export function createUser(id: string, email: string, password: string) {
//     const newUser: TUser = {
//         id: id,
//         email: email,
//         password: password
//     }
//         users.push(newUser)
//     console.log("Cadastro realizado com sucesso")
// }

//2 pegar tds users
export function getAllUsers(): TUser[] {
    return users
}






export const products: TProduct[] = [
    {
        id: "p1",
        name: "brinco",
        price: 45,
        category: CATEGORY.ACCESSORIES, 
        imageUrl: "httpsll"
    },

    {
        id: "p2",
        name: "celular",
        price: 55,
        category: CATEGORY.ELECTRONICS, 
        imageUrl: "httpskla"
    }
]

// 3 criar novo produto 
// export function createProduct(id: string, name: string, price: number, category: CATEGORY) {
//     const newProduct: TProduct = {
//         id: id,
//         name: name,
//         price: price,
//         category: category
//     }
//     products.push(newProduct)
//     console.log("Produto criado com sucesso")
// }

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
        id: "a001",
        total_price: 2,
        paid: 0,
        delivered_at: "aa-dd-mm",
        buyer_id: "pu001"
    }

]

//7 criar purchase
export function createPurchase(id: string, total_price: number, paid: number, delivered_at: string, buyer_id: string) {

    const newPurchase: TPurchase = {

        id: id,
        total_price: total_price,
        paid: paid,
        delivered_at: delivered_at,
        buyer_id: buyer_id
    }
    purchase.push(newPurchase)
    console.log("Compra realizada com sucesso")
    console.table(purchase)
}

// 8 buscarPurchase
export const getAllPurchaseFromUserId = (userIdToSearch: string): TPurchase[] => {
    return purchase.filter(
        (purchase) => {
            return (purchase.id.toLowerCase().includes(userIdToSearch.toLowerCase()))
        }
    )
}


