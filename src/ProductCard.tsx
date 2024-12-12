import { useContext } from 'react'
import { ProductType } from './ProductType'
import { ShoppingCartContext } from './ShoppingCartContextProvider'

function ProductCard(product: ProductType) {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext)

  return (
    <div className="flex flex-col items-start bg-white shadow-md rounded-lg p-4 relative">
      <img
        src={product.image}
        alt={product.title}
        className="self-center h-48 object-contain bg-white border border-gray-200 rounded-lg shadow overflow-hidden"
      />
      <h2
        className="text-lg font-semibold text-gray-900 line-clamp-2 sm:h-[3.5rem]"
        title={product.title}
      >
        {product.title}
      </h2>
      <span className="text-xl font-bold text-gray-900">
        Price: ${product.price.toFixed(2)}
      </span>
      <span
        title={product.category}
        className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
      >
        {product.category}
      </span>

      <div className="flex justify-between items-center mt-4">
        {isAddedToShoppingCart() ? (
          <>
            <button
              onClick={handleRemoveFromShoppingCart}
              className="absolute top-2 right-2 bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label={`Remove ${product.title} from cart`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <span className="text-green-500 mt-2 mb-1">Added to cart!</span>
          </>
        ) : (
          <button
            onClick={handleAddToShoppingCart}
            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600"
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )

  function isAddedToShoppingCart() {
    return Boolean(
      shoppingCart.find((cartProduct) => cartProduct.id === product.id)
    )
  }

  function handleRemoveFromShoppingCart(): void {
    const cartProductIndex = shoppingCart.findIndex(
      (item) => item.id === product.id
    )
    // safety check - do nothing if it's already removed
    if (cartProductIndex === -1) return

    const newShoppingCart = [
      ...shoppingCart.slice(0, cartProductIndex),
      ...shoppingCart.slice(cartProductIndex + 1)
    ]
    setShoppingCart(newShoppingCart)
  }

  function handleAddToShoppingCart(): void {
    const cartProductIndex = shoppingCart.findIndex(
      (item) => item.id === product.id
    )
    // safety check - do nothing if it's already there
    if (cartProductIndex !== -1) return

    setShoppingCart(shoppingCart.concat({ ...product, quantity: 1 }))
  }
}

export default ProductCard
