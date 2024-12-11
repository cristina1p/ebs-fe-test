import { useEffect, useState } from 'react'
import { ProductType } from './ProductType'

type Status = 'loading' | 'success' | 'failure'

function HomePage() {
  const [status, setStatus] = useState<Status>('loading')
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    setStatus('loading')

    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data: ProductType[]) => {
        setStatus('success')
        setProducts(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setStatus('failure')
      })
  }, [])

  return (
    <main>
      <h1>Products</h1>
      {renderContent()}
    </main>
  )

  function renderContent() {
    switch (status) {
      case 'loading':
        return <div>loading...</div>
      case 'success':
        return (
          <>
            {products.map((product) => (
              <div>
                <span>{product.title}</span>
                <span>{product.price}</span>
              </div>
            ))}
          </>
        )
      case 'failure':
      default:
        return <div>Something went wrong!</div>
    }
  }
}

export default HomePage
