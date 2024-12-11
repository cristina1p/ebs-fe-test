import { ShoppingCart } from '../ProductType'

export function getTotalQuantity(shoppingCart: ShoppingCart) {
  return shoppingCart.reduce(
    (acc, shoppingCartProduct) => acc + shoppingCartProduct.quantity,
    0
  )
}
