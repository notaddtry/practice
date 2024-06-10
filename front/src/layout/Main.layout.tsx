import { useState } from 'react'
import { Outlet } from 'react-router'
import { DrawerHeader } from '../components/ui/DrawerHeader'
import { Main } from '../components/ui/Main'
import { useAuth } from '../hooks/auth.hook'
import Header from './Header.layout'
import Side from './Side.layout'

const MainLayout = () => {
  const [open, setOpen] = useState(false)
  const isAuth = useAuth()

  const drawerWidth = isAuth ? 240 : 0

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Header
        drawerWidth={drawerWidth}
        isOpen={open}
        onOpen={handleDrawerOpen}
      />
      <Side
        drawerWidth={drawerWidth}
        isOpen={open}
        onClose={handleDrawerClose}
      />
      <Main open={open} drawerWidth={drawerWidth}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </>
  )
}

export default MainLayout
