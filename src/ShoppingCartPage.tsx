import { useContext } from 'react'
import { ShoppingCartContext } from './ShoppingCartContextProvider'
import ShoppingCartProduct from './ShoppingCartProduct'
import { ShoppingCart } from './ProductType'

function ShoppingCartPage() {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext)
  const subtotal = getSubtotal(shoppingCart)

  return (
    <main>
      <h1>Shopping Cart</h1>

      <div>
        {shoppingCart.map((shoppingCartProduct) => (
          <ShoppingCartProduct
            key={shoppingCartProduct.id}
            {...shoppingCartProduct}
          />
        ))}

        <div>Subtotal - ${subtotal}</div>

        {shoppingCart.length > 0 && (
          <button onClick={() => setShoppingCart([])}>Clear All</button>
        )}
      </div>
    </main>
  )
}

function getSubtotal(shoppingCart: ShoppingCart) {
  return shoppingCart
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2)
}

export default ShoppingCartPage
