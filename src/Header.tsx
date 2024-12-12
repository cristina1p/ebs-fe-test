import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { getTotalQuantity } from './helper/getTotalQuantity'
import { ShoppingCartContext } from './ShoppingCartContextProvider'

function Header() {
  const { shoppingCart } = useContext(ShoppingCartContext)
  const location = useLocation()
  const shoppingCartTotalQuantity = getTotalQuantity(shoppingCart)

  return (
    <header>
      <div>
        {location.pathname === '/cart' ? (
          <Link to="/" style={{ color: 'white' }}>
            Back to Products
          </Link>
        ) : (
          <Link to="/cart" style={{ color: 'white' }}>
            Go to Shopping Cart ({shoppingCartTotalQuantity})
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
