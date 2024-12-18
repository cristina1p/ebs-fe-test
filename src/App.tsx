import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import ProductsContextProvider from './ProductsContextProvider.tsx'
import ShoppingCartContextProvider from './ShoppingCartContextProvider.tsx'
import { Suspense, lazy } from 'react'

const HomePage = lazy(() => import('./home/HomePage.tsx'))
const ShoppingCartPage = lazy(
  () => import('./shopping-cart/ShoppingCartPage.tsx')
)
const NotFoundPage = lazy(() => import('./not-found/NotFoundPage.tsx'))

function App() {
  return (
    <ProductsContextProvider>
      <ShoppingCartContextProvider>
        <Suspense fallback={null}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="cart" element={<ShoppingCartPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </ShoppingCartContextProvider>
    </ProductsContextProvider>
  )
}

export default App
