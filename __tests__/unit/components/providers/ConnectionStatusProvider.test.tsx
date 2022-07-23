import { fireEvent, render } from '@testing-library/react'
import React, { useContext } from 'react'
import ConnectionStatusContext from '../../../../src/contexts/connection-status-context'
import { ConnectionStatusProvider } from '../../../../src/components/providers/ConnectionStatusProvider'
import { MemoryRouter } from 'react-router'
import { LocalStorageKey } from '../../../../src/enums/local-storage-key'
import { ConnectionStatus } from '../../../../src/enums/connection-status'

const mockUseLocationValue = {
  pathname: '/localhost:3000/tours',
  search: '',
  hash: '',
  state: null
}

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router') as any,
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn().mockImplementation(() => mockUseLocationValue),
  useHref: () => jest.fn()
}))

const TestingComponent = () => {
  const { showGoOnlineButton, isOffline, updateConnectionStatus, updateGoOnlineButtonVisibility, isOnlineInfoBannerVisible, updateOnlineInfoBannerVisibility, resetOnlineInfoBanner } = useContext(ConnectionStatusContext)
  const updateToOffline = () => updateConnectionStatus(ConnectionStatus.OFFLINE)
  const updateToOnline = () => updateConnectionStatus(ConnectionStatus.ONLINE)
  const updateGoOnlineButtonVisible = () => updateGoOnlineButtonVisibility(true)
  const updateGoOnlineButtonHidden = () => updateGoOnlineButtonVisibility(false)
  const updateInfoBannerVisible = () => updateOnlineInfoBannerVisibility(true)
  const updateInfoBannerHidden = () => updateOnlineInfoBannerVisibility(false)
  const resetInfoBanner = () => resetOnlineInfoBanner()

  return (<>
    <MemoryRouter initialEntries={['/currentUri']}>
      <span data-testid="showButton">{String(showGoOnlineButton)}</span>
      <span data-testid="isOffline">{String(isOffline())}</span>
      <span data-testid="isInfoBannerVisible">{String(isOnlineInfoBannerVisible)}</span>
      <button data-testid="update-connection-status-button--offline" onClick={updateToOffline}/>
      <button data-testid="update-connection-status-button--online" onClick={updateToOnline}/>
      <button data-testid="update-go-online-button--visible" onClick={updateGoOnlineButtonVisible}/>
      <button data-testid="update-go-online-button--hidden" onClick={updateGoOnlineButtonHidden}/>
      <button data-testid="update-info-banner--visible" onClick={updateInfoBannerVisible}/>
      <button data-testid="update-info-banner--hidden" onClick={updateInfoBannerHidden}/>
      <button data-testid="reset-info-banner" onClick={resetInfoBanner}/>
    </MemoryRouter>
  </>)
}

const renderTestComponent = () => render(<ConnectionStatusProvider><TestingComponent/></ConnectionStatusProvider>)

describe('ConnectionStatusProvider', () => {
  it('is show go online button false by default', () => {
    const { queryByTestId } = renderTestComponent()
    const testElement = queryByTestId('showButton')
    expect(testElement!.innerHTML).toEqual('false')
  })

  it('is offline status true after setting to ConnectionStatus.OFFLINE', () => {
    const { queryByTestId, getByTestId } = renderTestComponent()
    fireEvent.click(getByTestId('update-connection-status-button--offline'))
    const testElement = queryByTestId('isOffline')
    expect(testElement!.innerHTML).toEqual('true')
    const localStorageValue = localStorage.getItem(LocalStorageKey.ConnectionStatus)
    expect(localStorageValue).toEqual(ConnectionStatus.OFFLINE)
  })

  it('offline status is false after setting to ConnectionStatus.ONLINE and online button visibility is false', () => {
    const { queryByTestId, getByTestId } = renderTestComponent()
    fireEvent.click(getByTestId('update-connection-status-button--online'))
    const testElement = queryByTestId('isOffline')
    expect(testElement!.innerHTML).toEqual('false')
    const storedConnectionStatus = localStorage.getItem(LocalStorageKey.ConnectionStatus)
    expect(storedConnectionStatus).toEqual(ConnectionStatus.ONLINE)
    const goOnlineButton = queryByTestId('showButton')
    expect(goOnlineButton!.innerHTML).toEqual('false')
    const storedButtonVisibility = localStorage.getItem(LocalStorageKey.IsGoOnlineButtonVisible)
    expect(storedButtonVisibility).toEqual('false')
  })

  it('show go online button', () => {
    const { queryByTestId, getByTestId } = renderTestComponent()
    fireEvent.click(getByTestId('update-go-online-button--visible'))
    const testElement = queryByTestId('showButton')
    expect(testElement!.innerHTML).toEqual('true')
    const storedButtonVisibility = localStorage.getItem(LocalStorageKey.IsGoOnlineButtonVisible)
    expect(storedButtonVisibility).toEqual('true')
  })

  it('hide go online button', () => {
    const { queryByTestId, getByTestId } = renderTestComponent()
    fireEvent.click(getByTestId('update-go-online-button--hidden'))
    const testElement = queryByTestId('showButton')
    expect(testElement!.innerHTML).toEqual('false')
    const storedButtonVisibility = localStorage.getItem(LocalStorageKey.IsGoOnlineButtonVisible)
    expect(storedButtonVisibility).toEqual('false')
  })

  it('initial info banner state is false', () => {
    const { queryByTestId } = renderTestComponent()
    const testElement = queryByTestId('isInfoBannerVisible')
    expect(testElement!.innerHTML).toEqual('false')
    const isOnlineBannerVisible = localStorage.getItem(LocalStorageKey.IsOnlineBannerVisible)
    expect(isOnlineBannerVisible).toBeNull()
  })

  it('show info banner', () => {
    const { queryByTestId, getByTestId } = renderTestComponent()
    fireEvent.click(getByTestId('update-info-banner--visible'))
    const testElement = queryByTestId('isInfoBannerVisible')
    expect(testElement!.innerHTML).toEqual('true')
    const storedButtonVisibility = localStorage.getItem(LocalStorageKey.IsOnlineBannerVisible)
    expect(storedButtonVisibility).toEqual('true')
  })

  it('hide info banner', () => {
    const { queryByTestId, getByTestId } = renderTestComponent()
    fireEvent.click(getByTestId('update-info-banner--hidden'))
    const testElement = queryByTestId('isInfoBannerVisible')
    expect(testElement!.innerHTML).toEqual('false')
    const storedButtonVisibility = localStorage.getItem(LocalStorageKey.IsOnlineBannerVisible)
    expect(storedButtonVisibility).toEqual('false')
  })

  it('info banner information is removed from local storage', () => {
    const { queryByTestId, getByTestId } = renderTestComponent()
    fireEvent.click(getByTestId('reset-info-banner'))
    const testElement = queryByTestId('isInfoBannerVisible')
    expect(testElement!.innerHTML).toEqual('false')
    const storedButtonVisibility = localStorage.getItem(LocalStorageKey.IsOnlineBannerVisible)
    expect(storedButtonVisibility).toBeNull()
  })
})
