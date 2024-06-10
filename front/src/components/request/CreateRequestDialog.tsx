import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/form.hook'
import { useAppSelector } from '../../store/hooks'
import { createRequest } from '../../utils/http'

type Props = {
  open: boolean
  handleClose: () => void
}

export default function CreateRequestDialog({ open, handleClose }: Props) {
  const user = useAppSelector((state) => state.user.user)
  const initialState = { text: '', title: '' }
  const { form, onChange, renderError, setError, error } = useForm({
    initialState,
    open,
  })
  const navigate = useNavigate()

  if (!open) {
    return
  }

  const handleSubmit = async () => {
    const hasFormValue = form.title.trim() || form.text.trim()
    if (hasFormValue && user?.id) {
      const res = await createRequest({
        user_id: user?.id,
        text: form.text,
        title: form.title,
      })

      if ('id' in res) {
        navigate(`/request/${res.id}`)
      } else {
        setError(res.message)
      }
    }
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Форма создания заявки</DialogTitle>
      <DialogContent>
        <Stack width={1} alignItems="center">
          <Stack width="450px" gap={2}>
            <TextField
              required
              error={!!error}
              label="Заголовок заявки"
              variant="outlined"
              value={form.title}
              onChange={(e) => onChange(e, 'title')}
            />
            <TextField
              required
              error={!!error}
              label="Текст заявки"
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
