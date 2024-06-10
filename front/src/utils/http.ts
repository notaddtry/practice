import type { Departament, IComment, IRequestWithSeen, IUser } from '../types'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
type IError = { message: string }

export const request = async <T>(
  url: string,
  method: Method = 'GET',
  body?: Record<string, unknown>
): Promise<T> => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: new Headers({
      'content-type': 'application/json',
    }),
    // mode: 'no-cors',
  })

  const data = await response.json()

  if (!response.ok) {
    console.error(data.message)
  }

  return data
}

const userPrefix = 'http://localhost:3000/api/users/'
const requestPrefix = 'http://localhost:3000/api/requests'
const commentPrefix = 'http://localhost:3000/api/comments'

// User

export const login = async (body: {
  username: string
  password: string
}): Promise<IUser | IError> => {
  return await request(`${userPrefix}login`, 'POST', body)
}

export const getAllUsersByDepartament = async (departament: Departament) => {
  return await request(`${userPrefix}departament/${departament}`)
}

export const getOneUser = async (id: number): Promise<IUser | IError> => {
  return await request(`${userPrefix}${id}`)
}

// Request

export const getNotClosedRequests = async () => {
  return await request(`${requestPrefix}/not_closed`)
}

export const getNotClosedAndClientDepartamentRequests = async () => {
  return await request(`${requestPrefix}/not_closed_and_client`)
}

export const getAllStudyDepartamentRequests = async () => {
  return await request(`${requestPrefix}/study`)
}

export const getOneRequest = async (
  id: number
): Promise<IRequestWithSeen | IError> => {
  return await request(`${requestPrefix}/${id}`)
}

export const getAllRequestByUser = async (
  id: number
): Promise<IRequestWithSeen[] | IError> => {
  return await request(`${requestPrefix}/user/${id}`)
}

export const createRequest = async (body: {
  text: string
  user_id: number
  title: string
}): Promise<{ id: number } | IError> => {
  return await request(`${requestPrefix}`, 'POST', body)
}

export const takeRequest = async (body: {
  user_id: number
  request_id: number
}) => {
  return await request(`${requestPrefix}/${body.user_id}/take`, 'PUT', body)
}

export const placeRequestToAnotherSpecialist = async (body: {
  request_id: number
  specialist_id: number
}): Promise<number | IError> => {
  return await request(
    `${requestPrefix}/${body.specialist_id}/placeToAnother`,
    'PUT',
    body
  )
}

export const seeRequest = async (body: {
  user_id: number
  request_id: number
}) => {
  return await request(`${requestPrefix}/${body.user_id}/see`, 'PUT', body)
}

export const openRequest = async (body: {
  user_id: number
  request_id: number
}) => {
  return await request(`${requestPrefix}/${body.user_id}/open`, 'PUT', body)
}

export const closeRequest = async (body: {
  user_id: number
  request_id: number
}) => {
  return await request(`${requestPrefix}/${body.user_id}/close`, 'PUT', body)
}

// Comment

export const getAllCommentsToRequest = async (
  id: number
): Promise<IComment[] | IError> => {
  return await request(`${commentPrefix}/${id}`)
}

export const createComment = async (body: {
  text: string
  user_id: number
  request_id: number
}): Promise<{ id: number } | IError> => {
  return await request(`${commentPrefix}`, 'POST', body)
}
