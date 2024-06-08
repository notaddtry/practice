import { Stack } from '@mui/material'
import type { IRequest } from '../../types'

type Props = {
  request: IRequest
}

export default function RequestInList({ request }: Props) {
  return <Stack>{request.text}</Stack>
}
