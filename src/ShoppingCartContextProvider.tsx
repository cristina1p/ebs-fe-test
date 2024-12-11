import { createContext, useState } from 'react'
import { ShoppingCart } from './ProductType'

type ShoppingCartContextType = {
  shoppingCart: ShoppingCart
  setShoppingCart: (ShoppingCart: ShoppingCart) => void
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  shoppingCart: [],
  setShoppingCart: () => {}
})

function ShoppingCartContextProvider({ children }: React.PropsWithChildren) {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>([])

  return (
    <ShoppingCartContext.Provider value={{ shoppingCart, setShoppingCart }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export default ShoppingCartContextProvider
