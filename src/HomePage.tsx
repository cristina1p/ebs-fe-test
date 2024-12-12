import { useContext, useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { ProductType } from './ProductType'
import { ProductsContext } from './ProductsContextProvider'

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
    handleFetch()
  }, [])

  function handleFetch() {
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
        return (
          <div className="self-center border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        )
      case 'success':
        return (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-2">
              {renderFilters()}
              {renderSort()}
            </div>

            <div
              className={
                'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
              }
            >
              {products.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          </>
        )
      case 'failure':
      default:
        return (
          <div className="flex flex-col items-center justify-center space-y-4 text-center p-6 bg-gray-100 rounded-lg shadow-md">
            <span className="text-lg text-gray-700 font-medium">
              Something went wrong!
            </span>

            <button
              onClick={handleFetch}
              className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            >
              Please Retry!
            </button>
          </div>
        )
    }
  }

  // todo: extract to components
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
      <div className="flex flex-col md:flex-row md:items-center">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 whitespace-nowrap"
        >
          Filter by Category
        </label>
        <select
          id="category"
          onChange={handleFilterChange}
          className="md:ml-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
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
      <div className="flex flex-col md:flex-row md:items-center mb-2 md:mb-0">
        <label
          htmlFor="sort"
          className="block text-sm font-medium text-gray-700 whitespace-nowrap"
        >
          Sort by
        </label>

        <select
          id="sort"
          onChange={handleSortChange}
          className="md:ml-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
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
