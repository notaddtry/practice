import { useEffect, useState } from 'react'
import { IUser } from '../../types'
import { getOneUser } from '../../utils/http'

type Props = {
  id: number
  map: Map<number, IUser>
}

export default function SpecialistColumn({ id, map }: Props) {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const getSpecialist = async () => {
      const userInMap = map.get(id)
      if (userInMap) {
        setUser(userInMap)
      } else {
        if (id) {
          const res = await getOneUser(id)

          if ('id' in res) {
            map.set(id, res)

            setUser(res)
          }
        }
      }
    }

    getSpecialist()
  }, [id, map])

  return <>{user ? `${user?.name} ${user?.sur_name}` : ''}</>
}
