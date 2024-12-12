import { useContext } from 'react'
import { ShoppingCartContext } from './ShoppingCartContextProvider'
import ShoppingCartProduct from './ShoppingCartProduct'
import { ShoppingCart } from './ProductType'
import { getTotalQuantity } from './helper/getTotalQuantity'

function ShoppingCartPage() {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext)
  const subtotal = getSubtotal(shoppingCart)
  const totalQuantity = getTotalQuantity(shoppingCart)

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-grow">
      <h1 className="text-2xl font-bold mb-6 mt-6">Shopping Cart</h1>

      <div>
        <div role="list" aria-labelledby="cart-item-list" className="space-y-6">
          {shoppingCart.map((shoppingCartProduct) => (
            <ShoppingCartProduct
              key={shoppingCartProduct.id}
              {...shoppingCartProduct}
            />
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md mt-6 flex justify-end">
          <h2
            aria-live="polite"
            className="text-xl font-semibold text-gray-800"
          >
            Subtotal{' '}
            <span className="text-md text-gray-400">
              ({totalQuantity} items)
            </span>{' '}
            - ${subtotal}
          </h2>
        </div>

        {shoppingCart.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShoppingCart([])}
              aria-label="Clear all items in cart"
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Clear All
            </button>
          </div>
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
