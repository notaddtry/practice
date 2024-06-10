import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useTheme } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'
import { DrawerHeader } from '../ui/DrawerHeader'

type Props = {
  onClose: () => void
  isOpen: boolean
  drawerWidth: number
}

type ListItem = {
  id: number
  title: string
  href: string
}

const list: ListItem[] = [
  {
    id: 1,
    href: '/',
    title: 'Личный кабинет',
  },
  {
    id: 2,
    href: '/support',
    title: 'Центр поддержки',
  },
]

export default function Sidebar({ onClose, drawerWidth, isOpen }: Props) {
  const theme = useTheme()

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={isOpen}
    >
      <DrawerHeader>
        <IconButton onClick={onClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />
      <List>
        {list.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton to={item.href} component={RouterLink}>
              <ListItemText>{item.title}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
