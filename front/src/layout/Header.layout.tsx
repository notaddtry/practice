import Topbar from '../components/topbar/Topbar'

type Props = {
  drawerWidth: number
  isOpen: boolean
  onOpen: () => void
}

const Header = ({ drawerWidth, isOpen, onOpen }: Props) => {
  return <Topbar drawerWidth={drawerWidth} isOpen={isOpen} onOpen={onOpen} />
}

export default Header
