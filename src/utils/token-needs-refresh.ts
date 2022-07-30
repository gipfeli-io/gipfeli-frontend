import { JwtToken } from '../types/jwt-token'
import dayjs from 'dayjs'

/**
 * Checks whether a given JwtToken is within 5 minutes of expiry.
 * @param token
 * @param expiryDiff
 */
const tokenNeedsRefresh: (token: JwtToken, expiryDiff?: number) => (boolean) = (token: JwtToken, expiryDiff?: number) => {
  const { exp } = token
  const expiryDate = dayjs.unix(exp)
  const currentDate = dayjs()
  const diff = expiryDiff || 5
  return expiryDate.diff(currentDate, 'minutes') < diff
}

export default tokenNeedsRefresh
