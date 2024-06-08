import { Stack } from '@mui/material'
import { useAppSelector } from '../../store/hooks'
import RequestList from '../request/RequestList'

export default function User() {
  const user = useAppSelector((state) => state.user.user)

  return (
    <Stack>
      <RequestList userId={user?.id} />
    </Stack>
  )
}
