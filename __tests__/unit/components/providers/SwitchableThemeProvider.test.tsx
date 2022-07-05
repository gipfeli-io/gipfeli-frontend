import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import SwitchableThemeProvider from '../../../../src/components/providers/SwitchableThemeProvider'
import useTheme from '../../../../src/hooks/use-theme'
import { LocalStorageKey } from '../../../../src/enums/local-storage-key'

const TestingComponent = () => {
  const { activeTheme } = useTheme()
  return (<>
    <span data-testid="stylename">{activeTheme.name}</span>
  </>)
}

describe('SwitchableThemeProvider', () => {
  it('defaults to lightmode', () => {
    const { queryByTestId } = render(<SwitchableThemeProvider><TestingComponent/></SwitchableThemeProvider>)

    const testElement = queryByTestId('stylename')

    expect(testElement!.innerHTML).toEqual(LocalStorageKey.LightMode)
  })

  it('uses presaved mode if set', () => {
    Storage.prototype.getItem = jest.fn(() => LocalStorageKey.DarkMode)
    const { queryByTestId } = render(<SwitchableThemeProvider><TestingComponent/></SwitchableThemeProvider>)

    const testElement = queryByTestId('stylename')

    expect(testElement!.innerHTML).toEqual(LocalStorageKey.DarkMode)
  })
})
