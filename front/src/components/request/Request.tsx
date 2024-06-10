import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { seeRequestHandler } from '../../store/slices/request.slice'
import type { IComment, IRequestWithSeen } from '../../types'
import {
  closeRequest,
  getAllCommentsToRequest,
  getOneRequest,
  takeRequest,
} from '../../utils/http'
import CommentList from '../comment/CommentList'
import CreateCommentDialog from '../comment/CreateCommentDialog'
import PlaceToAnotherSpecialistDialog from './PlaceToAnotherSpecialistDialog'

export default function Request() {
  const { id } = useParams()
  const [request, setRequest] = useState<IRequestWithSeen | null>(null)
  const [comments, setComments] = useState<IComment[]>([])
  const [openComment, setOpenComment] = useState(false)
  const [
    openPlaceToAnotherSpecialistDialog,
    setOpenPlaceToAnotherSpecialistDialog,
  ] = useState(false)
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.user.user)
  const isUserRoleIsSpecialist = user?.role === 'specialist'
  const isOpenRequest = request?.status === 'open'
  const isCloseRequest = request?.status === 'close'
  const isAwaitingRequest = request?.status === 'awaiting'

  const handleClickOpenComment = () => {
    setOpenComment(true)
  }

  const handleCloseComment = () => {
    setOpenComment(false)
  }

  const handleClickOpenPlaceToAnotherSpecialistDialog = () => {
    setOpenPlaceToAnotherSpecialistDialog(true)
  }

  const handleClosePlaceToAnotherSpecialistDialog = () => {
    setOpenPlaceToAnotherSpecialistDialog(false)
  }

  useEffect(() => {
    if (id && user?.id) {
      dispatch(seeRequestHandler({ user_id: user?.id, request_id: +id }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id])

  useEffect(() => {
    const getRequest = async () => {
      if (id) {
        const res = await getOneRequest(+id)

        if ('id' in res) {
          setRequest(res)
        }
      }
    }

    const getComments = async () => {
      if (id) {
        const res = await getAllCommentsToRequest(+id)

        if (Array.isArray(res)) {
          setComments(res)
        }
      }
    }

    getRequest()
    getComments()
  }, [id, openComment])

  return (
    <>
      <Card>
        <CardContent>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography gutterBottom variant="h4" component="div">
              Заявка{' '}
              {request?.status === 'open'
                ? 'открыта'
                : request?.status === 'close'
                ? 'закрыта'
                : 'исполняется'}
            </Typography>
            <Stack flexDirection="row">
              {isUserRoleIsSpecialist &&
                !isCloseRequest &&
                !!comments.length && (
                  <Button
                    onClick={async () => {
                      if (user.id && request?.id) {
                        await closeRequest({
                          user_id: user.id,
                          request_id: request.id,
                        })
                        setRequest((prev) => {
                          if (prev) {
                            return {
                              ...prev,
                              status: 'close',
                            }
                          }
                          return prev
                        })
                      }
                    }}
                  >
                    Закрыть заявку
                  </Button>
                )}
              {isUserRoleIsSpecialist && !isCloseRequest && (
                <>
                  <Button
                    onClick={handleClickOpenPlaceToAnotherSpecialistDialog}
                  >
                    Отправить заявку специалисту другого отдела
                  </Button>
                  <PlaceToAnotherSpecialistDialog
                    open={openPlaceToAnotherSpecialistDialog}
                    handleClose={handleClosePlaceToAnotherSpecialistDialog}
                    request_id={request?.id}
                  />
                </>
              )}
              {isUserRoleIsSpecialist &&
                isOpenRequest &&
                (!request.specialist_id ||
                  request.specialist_id === user.id) && (
                  <Button
                    onClick={async () => {
                      if (user.id && request?.id) {
                        await takeRequest({
                          user_id: user.id,
                          request_id: request.id,
                        })
                        setRequest((prev) => {
                          if (prev) {
                            return {
                              ...prev,
                              status: 'awaiting',
                            }
                          }
                          return prev
                        })
                      }
                    }}
                  >
                    Принять заявку
                  </Button>
                )}
            </Stack>
          </Stack>

          <Typography gutterBottom variant="h5" component="div">
            {request?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {request?.text}
          </Typography>
        </CardContent>
      </Card>
      {(!!comments.length || isUserRoleIsSpecialist) && (
        <Divider sx={{ my: 2 }} />
      )}

      {((isUserRoleIsSpecialist && (isOpenRequest || isAwaitingRequest)) ||
        (!isUserRoleIsSpecialist && isCloseRequest)) && (
        <>
          <Button onClick={handleClickOpenComment}>Создать комментарий</Button>
          <CreateCommentDialog
            open={openComment}
            handleClose={handleCloseComment}
            request_id={request?.id}
          />
        </>
      )}
      <CommentList commentsList={comments} />
    </>
  )
}
