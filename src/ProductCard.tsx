import { useContext } from 'react'
import { ProductType } from './ProductType'
import { ShoppingCartContext } from './ShoppingCartContextProvider'

function ProductCard(product: ProductType) {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext)

  return (
    <div>
      <h2>{product.title}</h2>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>{product.category}</p>

      <div>
        {isAddedToShoppingCart() ? (
          <>
            <button onClick={handleRemoveFromShoppingCart}>Remove</button>
            <p>Added to cart!</p>
          </>
        ) : (
          <button onClick={handleAddToShoppingCart}>Add to Cart</button>
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
