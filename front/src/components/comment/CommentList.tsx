import { List, ListItem } from '@mui/material'
import type { IComment } from '../../types'
import Comment from './Comment'

type Props = {
  commentsList: IComment[]
}

export default function CommentList({ commentsList }: Props) {
  return (
    <List>
      {commentsList.map((comment) => {
        return (
          <ListItem key={comment.id}>
            <Comment comment={comment} />
          </ListItem>
        )
      })}
    </List>
  )
}
