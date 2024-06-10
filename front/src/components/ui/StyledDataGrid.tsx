import Box from '@mui/material/Box'
import { darken, lighten, styled } from '@mui/material/styles'
import { DataGrid, type DataGridProps } from '@mui/x-data-grid'
import { useAppSelector } from '../../store/hooks'
import type { IRequestWithSeen } from '../../types'
import { isAlert } from '../../utils/isAlert'

const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7)

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6)

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5)

const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4)

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .alert': {
    backgroundColor: getBackgroundColor(
      theme.palette.error.main,
      theme.palette.mode
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode
        ),
      },
    },
  },
}))

export default function DataGridWithStyledRows(data: DataGridProps) {
  const user = useAppSelector((state) => state.user.user)

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        {...data}
        getRowClassName={(params) =>
          isAlert(params.row as IRequestWithSeen, user)
        }
      />
    </Box>
  )
}
