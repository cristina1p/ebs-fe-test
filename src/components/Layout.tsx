import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.tsx'

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* `Outlet` will be either Home page or Shopping Cart page */}
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
