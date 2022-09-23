import React from 'react'
import { GpxFileUploadContextType } from '../types/contexts'

/**
 * The context interface (GpxFileUploadContextType) can be found in type src/types/contexts.ts.
 *
 * The context is not implemented in a separate provider as it is directly used in TourCreate.tsx and TourEdit.tsx.
 * It works closely together with the hook src/hooks/use-handle-gpx-file-upload which provides the upload functionality.
 *
 * We provide the hook src/hooks/use-gpx-file-upload, so you can easily re-use all the functionality in your components.
 */
const GpxFileUploadContext = React.createContext<GpxFileUploadContextType>(null!)

export default GpxFileUploadContext
