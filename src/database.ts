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

export function getAllUsers(): TUser[] {
    return users
}

export const products: TProduct[] = [
    {
        id: "p1",
        name: "brinco",
        price: 45,
        description: CATEGORY.ACCESSORIES, 
        imageUrl: "httpsll"
    },

    {
        id: "p2",
        name: "celular",
        price: 55,
        description: CATEGORY.ELECTRONICS, 
        imageUrl: "httpskla"
    }
]

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


export const purchases: TPurchase[] = [
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
    purchases.push(newPurchase)
    console.log("Compra realizada com sucesso")
    console.table(purchases)
}

// 8 buscarPurchase
export const getAllPurchaseFromUserId = (userIdToSearch: string): TPurchase[] => {
    return purchases.filter(
        (purchase) => {
            return (purchase.id.toLowerCase().includes(userIdToSearch.toLowerCase()))
        }
    )
}