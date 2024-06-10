import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import { Badge, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { useAuth } from '../../hooks/auth.hook'
import { AppBar } from '../ui/AppBar'
import Notification from './Notification'
import Profile from './Profile'

type Props = {
  onOpen: () => void
  isOpen: boolean
  drawerWidth: number
}

export default function Topbar({ onOpen, isOpen, drawerWidth }: Props) {
  const isAuth = useAuth()

  return (
    <AppBar position="fixed" open={isOpen} drawerWidth={drawerWidth}>
      <Toolbar>
        {isAuth && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onOpen}
            sx={{ mr: 2, ...(isOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { sm: 'block' } }}
        >
          MUI
        </Typography>

        {isAuth && (
          <Box sx={{ display: { md: 'flex' } }}>
            <IconButton size="large" color="inherit">
              <Badge color="error" variant="dot" invisible>
                <MailIcon />
              </Badge>
            </IconButton>

            <Notification />
            <Profile />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
