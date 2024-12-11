import { ShoppingCartProductType } from './ProductType'

function ShoppingCartProduct(product: ShoppingCartProductType) {
  return (
    <div>
      <div>{product.title}</div>
      <div>{product.category}</div>
      <div>${product.price}</div>

      <div>${(product.price * product.quantity).toFixed(2)}</div>
    </div>
  )
}

export default ShoppingCartProduct
