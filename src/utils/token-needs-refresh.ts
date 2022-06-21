import { JwtToken } from '../types/jwt-token'
import dayjs from 'dayjs'

/**
 * Checks whether a given JwtToken is within 5 minutes of expiry.
 * @param token
 */
const tokenNeedsRefresh: (token: JwtToken) => (boolean) = (token: JwtToken) => {
  const { exp } = token
  const expiryDate = dayjs.unix(exp)
  const currentDate = dayjs()
  return expiryDate.diff(currentDate, 'minutes') < 5
}

export default tokenNeedsRefresh
