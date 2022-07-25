import React from 'react'
import { ListContextProperties } from '../../../types/contexts'

/**
 * List wrapper that allows handling delete events triggered from deeply
 * nested child components.
 */
const ListContext = React.createContext<ListContextProperties>({
  deleteEvent: _id => {}
})

export default ListContext
