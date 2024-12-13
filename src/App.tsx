import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Layout from './Layout.tsx'
import ProductsContextProvider from './ProductsContextProvider.tsx'
import ShoppingCartContextProvider from './ShoppingCartContextProvider.tsx'
import { Suspense, lazy } from 'react'

const HomePage = lazy(() => import('./HomePage.tsx'))
const ShoppingCartPage = lazy(() => import('./ShoppingCartPage.tsx'))
const NotFoundPage = lazy(() => import('./NotFoundPage.tsx'))

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
