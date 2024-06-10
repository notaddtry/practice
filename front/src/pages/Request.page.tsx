import { useNavigate, useParams } from 'react-router-dom'
import Request from '../components/request/Request'

export default function Requestpage() {
  const { id } = useParams()
  const navigate = useNavigate()

  if (!id) {
    navigate('/404')

    return
  }

  return <Request />
}
