import { Stack } from '@mui/material'
import type { IComment } from '../../types'

type Props = {
  comment: IComment
}

export default function Comment({ comment }: Props) {
  return <Stack>{comment.text}</Stack>
}
