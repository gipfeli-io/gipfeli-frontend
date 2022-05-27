import React from 'react'

export interface TourListContextProperties {
    deleteEvent: (id: string) => void
}

/**
 * TourList wrapper that allows handling delete events triggered from deeply
 * nested child components.
 */
const TourListContext = React.createContext<TourListContextProperties>({
    deleteEvent: id => {
    }
})

export default TourListContext