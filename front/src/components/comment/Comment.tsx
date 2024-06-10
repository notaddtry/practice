import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import type { IComment, IUser } from '../../types'
import { getOneUser } from '../../utils/http'

type Props = {
  comment: IComment
}

export default function Comment({ comment }: Props) {
  const [commentOwner, setCommentOwner] = useState<IUser | null>(null)
  const user = useAppSelector((state) => state.user.user)

  useEffect(() => {
    const getOwner = async () => {
      const owner = await getOneUser(comment.user_id)

      if ('id' in owner) {
        setCommentOwner(owner)
      }
    }
    getOwner()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment.user_id])

  return (
    <Stack
      flexDirection="row"
      ml={commentOwner?.id === user?.id ? '0' : 'auto'}
    >{`${commentOwner?.name} ${commentOwner?.sur_name} ${
      commentOwner?.role === 'specialist' ? '(специалист)' : ''
    }: ${comment.text}`}</Stack>
  )
}
