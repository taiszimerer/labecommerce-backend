
export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string
  }

 export enum CATEGORY{
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
  }

export type TProduct = {
    id: string, 
    name: string, 
    price: number,
    description: string, 
    imageUrl: string
}

export type TPurchase = {
    id: string, 
    total_price: number,
    paid: number,
    delivered_at: string, 
    buyer_id: string
}
  