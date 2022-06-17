import '@testing-library/jest-dom'
import dayjs from 'dayjs'
import { JwtToken } from '../../../src/types/jwt-token'
import tokenNeedsRefresh from '../../../src/utils/token-needs-refresh'

describe('tokenNeedsRefresh', () => {
  it('returns true if token is below 5 minutes of validity', () => {
    const date = dayjs().add(4, 'minutes')
    const mockToken = { exp: date.toDate().getTime() / 1000 } as JwtToken

    expect(tokenNeedsRefresh(mockToken)).toEqual(true)
  })

  it('returns true if token expiration is in the past', () => {
    const date = dayjs().subtract(4, 'minutes')
    const mockToken = { exp: date.toDate().getTime() / 1000 } as JwtToken

    expect(tokenNeedsRefresh(mockToken)).toEqual(true)
  })

  it('returns false if token is of 5 minutes of validity', () => {
    const date = dayjs().add(5, 'minutes')
    const mockToken = { exp: date.toDate().getTime() / 1000 } as JwtToken

    expect(tokenNeedsRefresh(mockToken)).toEqual(false)
  })

  it('returns false if token is in the future', () => {
    const date = dayjs().add(5, 'days')
    const mockToken = { exp: date.toDate().getTime() / 1000 } as JwtToken

    expect(tokenNeedsRefresh(mockToken)).toEqual(false)
  })
})
