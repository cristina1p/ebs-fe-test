import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.tsx'

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
