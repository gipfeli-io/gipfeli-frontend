import React from 'react'
import { TourListContextProperties } from '../../../types/contexts'

/**
 * TourList wrapper that allows handling delete events triggered from deeply
 * nested child components.
 */
const TourListContext = React.createContext<TourListContextProperties>({
  // eslint-disable-next-line unused-imports/no-unused-vars
  deleteEvent: id => {}
})

export default TourListContext
