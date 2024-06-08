type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const request = async <T>(
  url: string,
  method: Method = 'GET',
  body?: Record<string, unknown>
): Promise<T> => {
  const response = await fetch(url, { method, body: JSON.stringify(body) })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data || 'Ошибка. Повторите позже')
  }

  return data
}

const userPrefix = '/api/user/'
const requestPrefix = '/api/request/'
const commentPrefix = '/api/comment/'

// User

export const login = async (body: { username: string; password: string }) => {
  return await request(`${userPrefix}login`, 'POST', body)
}

export const getAllUsersByDepartament = async (departament: number) => {
  return await request(`${userPrefix}departament/${departament}`)
}

export const getOneUser = async (id: number) => {
  return await request(`${userPrefix}${id}`)
}

// Request

export const getNotClosedRequests = async () => {
  return await request(`${requestPrefix}not_closed`)
}

export const getNotClosedAndClientDepartamentRequests = async () => {
  return await request(`${requestPrefix}not_closed_and_client`)
}

export const getOneRequest = async (id: number) => {
  return await request(`${requestPrefix}${id}`)
}

export const getAllRequestByUser = async (id: number) => {
  return await request(`${requestPrefix}user/${id}`)
}

export const createRequest = async (body: { text: string; id: number }) => {
  return await request(`${requestPrefix}`, 'POST', body)
}

export const takeRequest = async (body: {
  user_id: number
  request_id: number
}) => {
  return await request(`${requestPrefix}${body.user_id}/take`, 'PUT', body)
}

export const placeRequestToAnotherSpecialist = async (body: {
  request_id: number
  specialist_id: number
}) => {
  return await request(
    `${requestPrefix}${body.specialist_id}/placeToAnother`,
    'PUT',
    body
  )
}

export const seeRequest = async (body: {
  user_id: number
  request_id: number
}) => {
  return await request(`${requestPrefix}${body.user_id}/see`, 'PUT', body)
}

export const openRequest = async (body: {
  user_id: number
  request_id: number
}) => {
  return await request(`${requestPrefix}${body.user_id}/open`, 'PUT', body)
}

export const closeRequest = async (body: {
  user_id: number
  request_id: number
}) => {
  return await request(`${requestPrefix}${body.user_id}/close`, 'PUT', body)
}

// Comment

export const getAllCommentsByUser = async (id: number) => {
  return await request(`${commentPrefix}${id}`)
}

export const createComment = async (body: {
  text: string
  user_id: number
  request_id: number
}) => {
  return await request(`${commentPrefix}`, 'POST', body)
}
