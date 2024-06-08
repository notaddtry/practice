import { Outlet } from 'react-router'
import Footer from './Footer.layout'
import Header from './Header.layout'

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
