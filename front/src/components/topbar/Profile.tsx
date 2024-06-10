import AccountCircle from '@mui/icons-material/AccountCircle'
import { IconButton, Menu, MenuItem, Stack } from '@mui/material'
import { useState, type MouseEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { pushNewNotification } from '../../store/slices/request.slice'
import { logoutUser } from '../../store/slices/user.slice'

const menuId = 'profile'

export default function Profile() {
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const user = useAppSelector((state) => state.user.user)

  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const onLogout = () => {
    dispatch(logoutUser())
    dispatch(pushNewNotification([]))
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
      <MenuItem onClick={onLogout}>Выйти</MenuItem>
    </Menu>
  )
  return (
    <>
      <Stack
        ml={2}
        textAlign="center"
        justifyContent="center"
      >{`${user?.name} ${user?.sur_name}`}</Stack>

      <IconButton
        size="large"
        edge="end"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>

      {renderMenu}
    </>
  )
}
