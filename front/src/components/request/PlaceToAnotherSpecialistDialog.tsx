import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import type { IUser } from '../../types'
import {
  getAllUsersByDepartament,
  placeRequestToAnotherSpecialist,
} from '../../utils/http'

type Props = {
  open: boolean
  handleClose: () => void
  request_id: number | undefined
}

export default function PlaceToAnotherSpecialistDialog({
  open,
  handleClose,
  request_id,
}: Props) {
  const [specialist, setSpecialist] = useState<IUser | null>(null)
  const [options, setOptions] = useState<IUser[]>([])
  const [error, setError] = useState<string | null>(null)
  const user = useAppSelector((state) => state.user.user)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    const hasFormValue = specialist?.id
    if (hasFormValue && request_id) {
      const res = await placeRequestToAnotherSpecialist({
        specialist_id: specialist?.id,
        request_id,
      })

      if (typeof res === 'number') {
        handleClose()
        navigate('/support')
      } else {
        setError(res.message)
      }
    }
  }

  const onChange = (e: IUser | null) => {
    setSpecialist(e)
  }

  useEffect(() => {
    const getSpecialists = async () => {
      const userDepartament = user?.departament
      const anotherDepartament =
        userDepartament === 'study' ? 'client' : 'study'

      const specialists = await getAllUsersByDepartament(anotherDepartament)

      if (Array.isArray(specialists)) {
        setOptions(specialists)
      }
    }

    getSpecialists()
  }, [request_id, user?.departament])

  if (!open) {
    return
  }

  const renderError = () => {
    return <Typography>{error}</Typography>
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Выберите человека из другого отдела</DialogTitle>
      <DialogContent>
        <Stack width={1} alignItems="center">
          <Stack width="450px" gap={2}>
            <Autocomplete
              value={specialist}
              onChange={(_, v) => onChange(v)}
              options={options}
              sx={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField {...params} label="Специалист" />
              )}
              getOptionLabel={(opt) =>
                `${opt.name} ${opt.sur_name} ${opt.father_name}`
              }
              isOptionEqualToValue={(opt, val) => opt.id === val.id}
            />

            {error && renderError()}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Закрыть</Button>
        <Button onClick={handleSubmit}>Выбрать</Button>
      </DialogActions>
    </Dialog>
  )
}
