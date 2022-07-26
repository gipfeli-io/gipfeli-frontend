export const isOfflineResultMessage = (statusCode: number, statusMessage: string): boolean => {
  return statusCode === 500 && statusMessage === 'Failed to fetch'
}
