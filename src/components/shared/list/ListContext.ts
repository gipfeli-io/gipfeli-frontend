import React from 'react'
import { ListContextProperties } from '../../../types/contexts'

/**
 * List wrapper that allows handling delete events triggered from deeply
 * nested child components.
 */
const ListContext = React.createContext<ListContextProperties>({
  deleteEvent: _id => {
    // Base implementation that does nothing. An actual usage can override this method.
  }
})

export default ListContext
