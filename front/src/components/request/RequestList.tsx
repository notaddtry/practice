import { Button, Typography } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import type { IRequestWithSeen, IUser } from '../../types'
import {
  getAllRequestByUser,
  getAllStudyDepartamentRequests,
  getNotClosedAndClientDepartamentRequests,
} from '../../utils/http'
import { isAlert } from '../../utils/isAlert'
import DataGridWithStyledRows from '../ui/StyledDataGrid'
import CreateRequestDialog from './CreateRequestDialog'
import SpecialistColumn from './SpecialistColumn'

const userMap = new Map<number, IUser>()

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Номер заявки', flex: 0.5 },
  { field: 'title', headerName: 'Заголовок заявки', flex: 0.5 },
  { field: 'text', headerName: 'Текст заявки', flex: 1 },
  {
    field: 'status',
    headerName: 'Статус заявки',
    flex: 0.5,
    valueGetter: (value) =>
      value === 'open'
        ? 'Открыта'
        : value === 'close'
        ? 'Закрыта'
        : 'Исполняется',
  },
  {
    field: 'plan_end_date',
    headerName: 'Плановое время исполнения',
    flex: 0.5,
    valueGetter: (value) =>
      value
        ? new Date(value).toLocaleDateString('ru', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })
        : '',
  },
  {
    field: 'specialist_id',
    headerName: 'Специалист',
    flex: 0.5,
    renderCell: (params) => {
      return <SpecialistColumn id={params.value} map={userMap} />
    },
  },
]

export default function RequestList() {
  const user = useAppSelector((state) => state.user.user)
  const navigate = useNavigate()

  const [requests, setRequests] = useState<IRequestWithSeen[]>([])

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const getRequests = async () => {
      if (user?.id) {
        let res
        if (user.departament === 'client') {
          res = await getNotClosedAndClientDepartamentRequests()
        } else if (user.departament === 'study') {
          res = await getAllStudyDepartamentRequests()
        } else {
          res = await getAllRequestByUser(user?.id)
        }

        if (Array.isArray(res)) {
          setRequests(res)
        }
      }
    }

    getRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, open])

  const sortedRequests = useMemo(() => {
    return [...requests].sort((l, r) => {
      if (!!isAlert(l, user) && !!isAlert(r, user)) {
        return 0
      }
      if (isAlert(l, user)) {
        return -1
      }
      if (isAlert(r, user)) {
        return 1
      }

      return l.id - r.id
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(requests), user?.id])

  if (!requests.length) {
    return (
      <>
        <Typography>Нет заявок</Typography>
        {user?.role === 'user' && (
          <>
            <Button onClick={handleClickOpen}>Создать заявку</Button>
            <CreateRequestDialog open={open} handleClose={handleClose} />
          </>
        )}
      </>
    )
  }

  return (
    <>
      {user?.role === 'user' && (
        <>
          <Button onClick={handleClickOpen}>Создать заявку</Button>
          <CreateRequestDialog open={open} handleClose={handleClose} />
        </>
      )}

      <DataGridWithStyledRows
        sx={{
          '.MuiCheckbox-root': {
            displayPrint: 'none',
          },
          '.MuiDataGrid-row': {
            cursor: 'pointer',
          },
        }}
        disableColumnMenu
        checkboxSelection={false}
        onRowClick={({ row }) => navigate(`/request/${row.id}`)}
        rows={sortedRequests}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
      />
    </>
  )
}
