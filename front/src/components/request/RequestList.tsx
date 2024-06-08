import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import type { IRequest } from '../../types'
import RequestInList from './RequestInList'

type Props = {
  userId?: number
}

export default function RequestList({ userId }: Props) {
  const [requests] = useState<IRequest[]>([])

  useEffect(() => {
    console.log(userId)
  })

  return (
    <Stack>
      {requests.map((request) => (
        <RequestInList key={request.id} request={request} />
      ))}
    </Stack>
  )
}
