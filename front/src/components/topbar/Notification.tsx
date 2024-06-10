import NotificationsIcon from '@mui/icons-material/Notifications'
import { Badge, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

const menuId = 'notification'

export default function Notification() {
  const newRequests = useAppSelector((state) => state.request.newRequests)
  const hasNewNotification = useAppSelector(
    (state) => state.request.isNewNotification
  )
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const selectNewRequestInMenu = (id: number) => {
    navigate(`/request/${id}`)
    setAnchorEl(null)
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {newRequests.map((request) => {
        return (
          <MenuItem
            key={request.id}
            onClick={() => selectNewRequestInMenu(request.id)}
          >
            {request.text}
          </MenuItem>
        )
      })}
      {!newRequests.length && (
        <Typography mx={2}>Нет новых уведомлений</Typography>
      )}
    </Menu>
  )

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleNotificationMenuOpen}
        color="inherit"
      >
        <Badge color="error" variant="dot" invisible={!hasNewNotification}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {renderMenu}
    </>
  )
}
