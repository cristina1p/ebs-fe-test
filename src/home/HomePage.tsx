import { useContext, useEffect, useState } from 'react'
import { ProductType } from '../ProductType'
import { ProductsContext } from '../ProductsContextProvider'
import LoadingIndicator from './components/LoadingIndicator'
import { SomethingWentWrong } from './components/SomethingWentWrong'
import ProductsContent from './components/ProductsContent'

type Status = 'loading' | 'success' | 'failure'

function HomePage() {
  const { setProducts: setContextProducts } = useContext(ProductsContext)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    handleFetch()
  }, [])

  function handleFetch() {
    setStatus('loading')

    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data: ProductType[]) => {
        setStatus('success')
        setContextProducts(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setStatus('failure')
      })
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-grow">
      <h1 className="text-2xl font-bold mb-6 mt-6">Products</h1>
      <div
        className={`flex flex-col flex-grow ${
          status === 'loading' ? 'justify-center' : ''
        }`}
      >
        {renderBody()}
      </div>
    </main>
  )

  function renderBody() {
    switch (status) {
      case 'loading':
        return <LoadingIndicator />
      case 'success':
        return <ProductsContent />
      case 'failure':
      default:
        return <SomethingWentWrong onButtonClick={handleFetch} />
    }
  }
}

export default HomePage
