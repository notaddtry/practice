import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import type { IComment } from '../../types'
import Comment from './Comment'

type Props = {
  requestId: number
}

export default function CommentList({ requestId }: Props) {
  const [comments] = useState<IComment[]>([])

  useEffect(() => {
    console.log(requestId)
  })

  return (
    <Stack>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Stack>
  )
}
