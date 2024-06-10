export type Role = 'user' | 'specialist'
export type Departament = 'client' | 'study'

export type IUser = {
  id: number
  name: string
  sur_name: string
  father_name: string
  username: string
  password: string
  role: Role
  departament?: Departament
}

export type Status = 'open' | 'close' | 'awaiting'

export type IRequest = {
  id: number
  text: string
  title: string
  status: Status
  plan_end_date: Date
  user_id: number
  specialist_id: number
}

export type IRequestWithSeen = IRequest & Omit<IsSeenRequest, 'request_id'>

export type IsSeenRequest = {
  request_id: number
  is_seen_by_user: boolean
  is_seen_by_specialist: boolean
}

export type IComment = {
  id: number
  text: string
  created_at: Date
  user_id: number
  request_id: number
}
