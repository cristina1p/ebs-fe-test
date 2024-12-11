import { createContext, useState } from 'react'
import { ProductType } from './ProductType'

type ProductsContextType = {
  products: ProductType[]
  setProducts: (products: ProductType[]) => void
}

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => {}
})

function ProductsContextProvider({ children }: React.PropsWithChildren) {
  const [products, setProducts] = useState<ProductType[]>([])

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContextProvider
