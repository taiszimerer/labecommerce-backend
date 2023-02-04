import { TProduct, TUser, TPurchase, CATEGORY} from "./types";

export let users: TUser[] = [
    {
        id: "u1",
        name: "tais",
        email: "taiszimerer@gamil.com",
        password: "1452", 
        created_at: "now"
    },

    {
        id: "u2",
        name: "user2",
        email: "user2@email.com",
        password: "14s5", 
        created_at: "now"
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
        image_url: "httpsll"
    },

    {
        id: "p2",
        name: "celular",
        price: 55,
        description: CATEGORY.ELECTRONICS, 
        image_url: "httpskla"
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
        buyer: "1",
        total_price: 2,
        created_at: "now",
        paid: 0,

    }
]

//7 criar purchase
export function createPurchase(id: string, buyer: string, total_price: number, created_at: string, paid: number) {
    const newPurchase: TPurchase = {

        id: id,
        buyer: buyer,
        total_price: total_price,
        created_at: created_at,
        paid: paid,
    
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