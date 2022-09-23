import React from 'react'
import { ImageUploadContextType } from '../types/contexts'

/**
 * The context interface (ImageUploadContextType) can be found in type src/types/contexts.ts.
 *
 * The context is not implemented in a separate provider as it is directly used in TourCreate.tsx and TourEdit.tsx.
 * It works closely together with the hook src/hooks/use-handle-image-upload which provides the upload functionality.
 *
 * We provide the hook src/hooks/use-image-upload, so you can easily re-use all the functionality in your components.
 */
const ImageUploadContext = React.createContext<ImageUploadContextType>(null!)

export default ImageUploadContext
