import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/auth/RequireAuth'
import MainLayout from './layout/Main.layout'
import NotFined from './pages/404.page'
import Authpage from './pages/Auth.page'
import Mainpage from './pages/Main.page'
import Requestpage from './pages/Request.page'
import Supportpage from './pages/Support.page'

const useRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <Mainpage />
            </RequireAuth>
          }
        />
        <Route
          path="/support"
          element={
            <RequireAuth>
              <Supportpage />
            </RequireAuth>
          }
        />
        <Route
          path="/request/:id"
          element={
            <RequireAuth>
              <Requestpage />
            </RequireAuth>
          }
        />
        <Route element={<Authpage />} path="/auth" />
        <Route path="*" element={<NotFined />} />
      </Route>
    </Routes>
  )
}

export default useRoutes
