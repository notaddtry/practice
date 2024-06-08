export type Role = 'user' | 'specialist'
export type Departament = 'client' | 'study'

export type IUser = {
  id: number
  name: string
  sur_name: string
  father_name: string
  role: Role
  departament?: Departament
}

export type Status = 'open' | 'close' | 'awaiting'

export type IRequest = {
  id: number
  text: string
  status: Status
  plan_end_time: Date
  user_id: number
  specialist_id: number
}

export type IComment = {
  id: number
  text: string
  created_at: Date
  user_id: number
  request_id: number
}
