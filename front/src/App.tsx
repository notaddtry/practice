import { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import useRoutes from './routes'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { pushNewNotification } from './store/slices/request.slice'
import {
  getAllRequestByUser,
  getAllStudyDepartamentRequests,
  getNotClosedAndClientDepartamentRequests,
} from './utils/http'

export default function App() {
  const routes = useRoutes()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)

  useEffect(() => {
    const getRequestsByUser = async () => {
      if (user?.id) {
        let res
        if (user.departament === 'client') {
          res = await getNotClosedAndClientDepartamentRequests()
        } else if (user.departament === 'study') {
          res = await getAllStudyDepartamentRequests()
        } else {
          res = await getAllRequestByUser(user?.id)
        }

        if (Array.isArray(res)) {
          const newRequests = res.filter((req) => {
            if (user.role === 'user') {
              return !req.is_seen_by_user
            }
            return !req.is_seen_by_specialist
          })

          dispatch(pushNewNotification(newRequests))
        }
      }
    }
    getRequestsByUser()

    const intervalId = setInterval(async () => {
      getRequestsByUser()
    }, 10000)

    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user?.id, user?.role])

  return (
    <Router basename="/">
      <>{routes}</>
    </Router>
  )
}
