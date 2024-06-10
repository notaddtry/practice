import { Button, Stack, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/form.hook'
import { useAppDispatch } from '../../store/hooks'
import { loginUser } from '../../store/slices/user.slice'
import { login } from '../../utils/http'

export default function Auth() {
  const initialState = { username: '', password: '' }

  const { form, onChange, renderError, setError, error } = useForm({
    initialState,
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const hasFormValue = form.password.trim() || form.username.trim()
    if (hasFormValue) {
      const res = await login({
        username: form.username,
        password: form.password,
      })

      if ('id' in res) {
        dispatch(loginUser(res))
        navigate('/')
      } else {
        setError(res.message)
      }
    }
  }

  return (
    <Stack width={1} alignItems="center">
      <Stack width="450px" gap={2}>
        <TextField
          required
          error={!!error}
          label="Имя пользователя"
          variant="outlined"
          value={form.username}
          onChange={(e) => onChange(e, 'username')}
        />
        <TextField
          required
          error={!!error}
          label="Пароль"
          variant="outlined"
          value={form.password}
          onChange={(e) => onChange(e, 'password')}
        />

        <Button onClick={() => handleSubmit()}>Войти</Button>

        {error && renderError()}
      </Stack>
    </Stack>
  )
}
