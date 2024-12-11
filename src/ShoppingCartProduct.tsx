import { useContext, useState } from 'react'
import { ShoppingCartProductType } from './ProductType'
import { ShoppingCartContext } from './ShoppingCartContextProvider'

function ShoppingCartProduct(product: ShoppingCartProductType) {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext)
  const [quantity, setQuantity] = useState<number | string>(product.quantity)

  return (
    <div>
      <div>{product.title}</div>
      <div>{product.category}</div>
      <div>${product.price}</div>

      <div>${(product.price * product.quantity).toFixed(2)}</div>
      <input
        type="text"
        value={quantity}
        onChange={handleQuantityInputChange}
      />
    </div>
  )

  function handleQuantityInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const quantityInputValue = event.target.value
    const MaxQuantity = 100
    // Allow only numeric input and enforce max value of 100
    if (quantityInputValue === '' || /^[0-9]*$/.test(quantityInputValue)) {
      const quantity = parseInt(quantityInputValue, 10)

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
