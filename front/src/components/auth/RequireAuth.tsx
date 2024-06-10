import { Navigate } from 'react-router'
import { useAuth } from '../../hooks/auth.hook'

type PropsRequireAuth = {
  children?: React.ReactNode
}

const RequireAuth = ({ children }: PropsRequireAuth) => {
  const isAuth = useAuth()

  if (!isAuth) {
    return <Navigate to="/auth" />
  }

  return <>{children}</>
}

export default RequireAuth
