import Sidebar from '../components/sidebar/Sidebar'

type Props = {
  drawerWidth: number
  isOpen: boolean
  onClose: () => void
}

export default function Side({ drawerWidth, isOpen, onClose }: Props) {
  return <Sidebar drawerWidth={drawerWidth} isOpen={isOpen} onClose={onClose} />
}
