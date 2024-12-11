import { Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './HomePage.tsx'
import ShoppingCartPage from './ShoppingCartPage.tsx'
import Layout from './Layout.tsx'
import NotFoundPage from './NotFoundPage.tsx'
import ProductsContextProvider from './ProductsContextProvider.tsx'

function App() {
  return (
    <ProductsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="cart" element={<ShoppingCartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductsContextProvider>
  )
}

export default App
