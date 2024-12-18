import { useContext, useState } from 'react'
import { ProductsContext } from '../../ProductsContextProvider'
import { ProductType } from '../../ProductType'
import Filter from './Filter'
import Sort from './Sort'
import ProductCard from './ProductCard'

const NoFilter = 'No Filter'
const BestMatch = 'Best Match'
const PriceLow = 'Price Low'
const PriceHigh = 'Price High'

function ProductsContent() {
  const { products: contextProducts } = useContext(ProductsContext)
  const [products, setProducts] = useState<ProductType[]>(contextProducts)
  const [filterCriteria, setFilterCriteria] = useState(NoFilter)
  const [sortCriteria, setSortCriteria] = useState(BestMatch)

  const uniqueFilterCategories = [NoFilter].concat(
    getCategories(contextProducts)
  )
  function handleSortChange(selectedSortCriteria: string) {
    const newProducts = applyCriteria(
      contextProducts,
      filterCriteria,
      selectedSortCriteria
    )

    setSortCriteria(selectedSortCriteria)
    setProducts(newProducts)
  }

  function handleFilterChange(selectedFilterCriteria: string) {
    const newProducts = applyCriteria(
      contextProducts,
      selectedFilterCriteria,
      sortCriteria
    )

    setFilterCriteria(selectedFilterCriteria)
    setProducts(newProducts)
  }
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <Filter
          categories={uniqueFilterCategories}
          onFilterChange={handleFilterChange}
        />
        <Sort
          onSortChange={handleSortChange}
          options={[BestMatch, PriceLow, PriceHigh]}
        />
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
}

function applyCriteria(
  contextProducts: ProductType[],
  filterCriteria: string,
  sortCriteria: string
): ProductType[] {
  let newProducts = contextProducts

  if (filterCriteria !== NoFilter) {
    newProducts = contextProducts.filter(
      (product) => filterCriteria === product.category
    )
  }

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

export default ProductsContent
