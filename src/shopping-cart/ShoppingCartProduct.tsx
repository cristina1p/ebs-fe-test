import { useContext, useState } from 'react'
import { ShoppingCartProductType } from '../ProductType'
import { ShoppingCartContext } from '../ShoppingCartContextProvider'

function ShoppingCartProduct(product: ShoppingCartProductType) {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext)
  const [quantity, setQuantity] = useState<number | string>(product.quantity)

  return (
    <div
      role="listitem"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-6 bg-white rounded-lg shadow-md p-4"
    >
      <div className="flex justify-center items-center">
        <img
          src={product.image}
          alt="Product Image"
          className="w-24 h-24 object-cover rounded-md"
        />
      </div>

      <div className="flex items-center justify-center sm:justify-start md:col-span-2">
        <span
          title={product.title}
          className="text-sm font-medium text-gray-800"
        >
          {product.title}
        </span>
      </div>

      <div className="flex items-center justify-center sm:justify-start">
        <span title={product.category} className="text-sm text-gray-600">
          {product.category}
        </span>
      </div>

      <div className="flex items-center justify-center sm:justify-start">
        <span className="text-sm font-semibold text-gray-800">
          ${product.price}
        </span>
      </div>

      <div className="flex items-center justify-center sm:justify-start">
        <input
          type="text"
          value={quantity}
          onChange={handleQuantityInputChange}
          aria-label="Quantity"
          aria-describedby={`Quantity of ${product.title}`} // For additional info
          className="w-16 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex items-center justify-center sm:justify-start">
        <span className="text-sm font-semibold text-gray-800">
          ${(product.price * product.quantity).toFixed(2)}
        </span>
      </div>

      <div className="flex justify-center items-center sm:justify-end">
        <div className="flex justify-center items-center sm:justify-end">
          <button
            aria-label={`Remove ${product.title} from cart`}
            onClick={handleRemoveFromShoppingCart}
            className="text-red-500 hover:text-red-700 focus:outline-none flex items-center justify-center p-2 rounded-full hover:bg-red-50 focus:ring-2 focus:ring-red-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )

  function handleRemoveFromShoppingCart() {
    const cartProductIndex = shoppingCart.findIndex(
      (item) => item.id === product!.id
    )
    if (cartProductIndex === -1) return

    const newShoppingCart = [
      ...shoppingCart.slice(0, cartProductIndex),
      ...shoppingCart.slice(cartProductIndex + 1)
    ]
    setShoppingCart(newShoppingCart)
  }

  function handleQuantityInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const quantityInputValue = event.target.value
    // Allow only numeric input and enforce max value of 100
    if (quantityInputValue === '' || /^[0-9]*$/.test(quantityInputValue)) {
      const quantity = parseInt(quantityInputValue, 10)

      const MaxQuantity = 100
      if (isNaN(quantity) || quantity <= MaxQuantity) {
        setQuantity(quantityInputValue)
        updateShoppingCart(quantity || 0)
      }
    }
  }

  function updateShoppingCart(quantity: number) {
    const cartProductIndex = shoppingCart.findIndex(
      (item) => item.id === product!.id
    )

    // safety check - if no card product item was found
    if (cartProductIndex === -1) return

    const oldCartProduct = shoppingCart[cartProductIndex]
    const newCartProduct = { ...oldCartProduct, quantity }
    const newShoppingCart = [
      ...shoppingCart.slice(0, cartProductIndex),
      newCartProduct,
      ...shoppingCart.slice(cartProductIndex + 1)
    ]
    setShoppingCart(newShoppingCart)
  }
}

export default ShoppingCartProduct
