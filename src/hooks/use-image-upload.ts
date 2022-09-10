import { useContext } from 'react'
import ImageUploadContext from '../contexts/image-upload-context'

const useImageUpload = () => useContext(ImageUploadContext)

export default useImageUpload
