import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'

type Props<T extends Record<string, unknown>> = {
  initialState: T
  open?: boolean
}

export function useForm<T extends Record<string, unknown>>({
  initialState,
  open,
}: Props<T>) {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState<string | null>(null)

  const renderError = () => {
    return <Typography>{error}</Typography>
  }

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: keyof T
  ) => {
    setError(null)
    setForm((prev) => {
      return { ...prev, [type]: event.target.value }
    })
  }

  useEffect(() => {
    setForm(initialState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return { form, renderError, onChange, setError, error }
}
