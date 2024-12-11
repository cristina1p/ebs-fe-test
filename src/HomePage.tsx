import { useContext, useEffect, useState } from 'react'
import { ProductType } from './ProductType'
import { ProductsContext } from './ProductsContextProvider'
import ProductCard from './ProductCard'

type Status = 'loading' | 'success' | 'failure'
const NoFilter = 'No Filter'
const BestMatch = 'Best Match'
const PriceLow = 'Price Low'
const PriceHigh = 'Price High'

function HomePage() {
  const { products: contextProducts, setProducts: setContextProducts } =
    useContext(ProductsContext)
  const [products, setProducts] = useState<ProductType[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [filterCriteria, setFilterCriteria] = useState(NoFilter)
  const [sortCriteria, setSortCriteria] = useState(BestMatch)

  useEffect(() => {
    setStatus('loading')

    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data: ProductType[]) => {
        setStatus('success')
        setContextProducts(data)
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
            {renderFilters()}
            {renderSort()}
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </>
        )
      case 'failure':
      default:
        return <div>Something went wrong!</div>
    }
  }

  function renderFilters() {
    const handleFilterChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const selectedFilterCriteria = event.target.value
      const newProduct = applyCriteria(
        contextProducts,
        selectedFilterCriteria,
        sortCriteria
      )

      setFilterCriteria(selectedFilterCriteria)
      setProducts(newProduct)
    }

    const uniqueFilterCategories = [NoFilter].concat(
      getCategories(contextProducts)
    )
    return (
      <div>
        Filter by
        <select onChange={handleFilterChange}>
          {uniqueFilterCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    )
  }

  function renderSort() {
    function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
      const selectedSortCriteria = event.target.value
      const newProducts = applyCriteria(
        contextProducts,
        filterCriteria,
        selectedSortCriteria
      )

      setSortCriteria(selectedSortCriteria)
      setProducts(newProducts)
    }
    return (
      <div>
        Sort by
        <select onChange={handleSortChange}>
          <option value={BestMatch}>{BestMatch}</option>
          <option value={PriceLow}>{PriceLow}</option>
          <option value={PriceHigh}>{PriceHigh}</option>
        </select>
      </div>
    )
  }
}

function applyCriteria(
  contextProducts: ProductType[],
  filterCriteria: string,
  sortCriteria: string
) {
  const newProducts = contextProducts.filter(
    (product) =>
      filterCriteria === NoFilter || filterCriteria === product.category
  )

  if (sortCriteria !== BestMatch) {
    newProducts.sort((a, b) =>
      sortCriteria === PriceLow ? a.price - b.price : b.price - a.price
    )
  }

  return newProducts
}

function getCategories(products: ProductType[]) {
  return Array.from(new Set(products.map((item) => item.category)))
}

export default HomePage
