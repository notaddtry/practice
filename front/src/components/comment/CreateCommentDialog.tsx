import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import { useForm } from '../../hooks/form.hook'
import { useAppSelector } from '../../store/hooks'
import { createComment } from '../../utils/http'

type Props = {
  open: boolean
  handleClose: () => void
  request_id: number | undefined
}

export default function CreateCommentDialog({
  open,
  handleClose,
  request_id,
}: Props) {
  const user = useAppSelector((state) => state.user.user)
  const initialState = { text: '' }
  const { form, onChange, renderError, setError, error } = useForm({
    initialState,
    open,
  })

  if (!open) {
    return
  }

  const handleSubmit = async () => {
    const hasFormValue = form.text.trim()
    if (hasFormValue && user?.id && request_id) {
      const res = await createComment({
        user_id: user?.id,
        text: form.text,
        request_id,
      })

      if ('id' in res) {
        handleClose()
      } else {
        setError(res.message)
      }
    }
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Форма создания комментария</DialogTitle>
      <DialogContent>
        <Stack width={1} alignItems="center">
          <Stack width="450px" gap={2}>
            <TextField
              required
              error={!!error}
              label="Текст комментария"
              variant="outlined"
              value={form.text}
              onChange={(e) => onChange(e, 'text')}
            />

            {error && renderError()}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Закрыть</Button>
        <Button onClick={handleSubmit}>Создать</Button>
      </DialogActions>
    </Dialog>
  )
}
