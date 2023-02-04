
export type TUser = {
  id: string,
  name: string,
  email: string,
  password: string,
  created_at: string
}

export enum CATEGORY {
  ACCESSORIES = "Acessórios",
  CLOTHES_AND_SHOES = "Roupas e calçados",
  ELECTRONICS = "Eletrônicos"
}

export type TProduct = {
  id: string,
  name: string,
  price: number,
  description: string,
  image_url: string
}

export type TPurchase = {
  id: string,
  buyer: string,
  total_price: number,
  created_at: string,
  paid: number
}

export type TPurchaseProducts = {
  purchase_id: string,
  product_id: string,
  quantity: number
}