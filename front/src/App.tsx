import useRoutes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'

export default function App() {
  const routes = useRoutes()

  //request notification
  // useEffect(() => {
  //   const intervalId = setInterval(() => {

  //   }, 10000)

  //   return () => clearInterval(intervalId)
  // }, [])

  return (
    <Router basename="/">
      <>{routes}</>
    </Router>
  )
}
