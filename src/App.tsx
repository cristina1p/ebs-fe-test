import { Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './HomePage.tsx'
import ShoppingCartPage from './ShoppingCartPage.tsx'
import Layout from './Layout.tsx'
import NotFoundPage from './NotFoundPage.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<ShoppingCartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
