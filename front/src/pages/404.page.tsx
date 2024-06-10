import { Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFined = () => {
  return (
    <Stack alignItems="center" justifyContent="center" gap={20}>
      <Typography variant="h4">Страница не найдена</Typography>
      <Link to={'/'}>Вернуться на главную</Link>
    </Stack>
  )
}

export default NotFined
