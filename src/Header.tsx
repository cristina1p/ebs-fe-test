import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  return (
    <header>
      <div>
        {location.pathname === '/cart' ? (
          <Link to="/" style={{ color: 'white' }}>
            Back to Products
          </Link>
        ) : (
          <Link to="/cart" style={{ color: 'white' }}>
            Go to Shopping Cart
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
