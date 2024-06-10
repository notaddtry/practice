import {
  HOUR_IN_DAY,
  MINUTE_IN_HOUR,
  MS_IN_SECOND,
  SECOND_IN_MINUTE,
} from '../consts'
import type { IRequestWithSeen, IUser } from '../types'

export const isAlert = (request: IRequestWithSeen, user: IUser | null) => {
  if (request.plan_end_date) {
    const timeLeft = new Date(request.plan_end_date).getTime() - Date.now()
    const timeToCheckWith =
      MS_IN_SECOND * SECOND_IN_MINUTE * MINUTE_IN_HOUR * HOUR_IN_DAY * 2

    const isAlert = timeLeft < timeToCheckWith

    const isNearToPlanEnd = isAlert && request.status !== 'close'

    if (user?.role === 'specialist' && isNearToPlanEnd) {
      return `alert`
    }
  }
  return ''
}
