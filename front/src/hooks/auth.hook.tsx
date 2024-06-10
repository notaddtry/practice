import { useAppSelector } from '../store/hooks'

export const useAuth = () => {
  const { user } = useAppSelector((state) => state.user)

  return !!user
}
