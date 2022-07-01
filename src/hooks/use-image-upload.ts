import { useContext } from 'react'
import ImageUploadContext from '../components/shared/images/upload/image-upload-context'

const useImageUpload = () => useContext(ImageUploadContext)

export default useImageUpload
