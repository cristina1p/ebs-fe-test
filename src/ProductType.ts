export type ProductType = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type ShoppingCartProductType = ProductType & {
  quantity: number
}

export type ShoppingCart = ShoppingCartProductType[]
