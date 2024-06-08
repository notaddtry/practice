import { Route, Routes } from 'react-router-dom'
import NotFined from './pages/404.page'
import MainLayout from './layout/Main.layout'
import Mainpage from './pages/Main.page'

const useRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route element={<Mainpage />} index />
        {/* <Route element={<FolderPage />} path="/folder/:id" />
        <Route element={<MessagePage />} path="/message/:id" />
        <Route element={<SearchPage />} path="/message" /> */}
        <Route path="*" element={<NotFined />} />
      </Route>
    </Routes>
  )
}

export default useRoutes
