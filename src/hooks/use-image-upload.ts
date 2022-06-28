import ImageUploadContext from '../components/app/image-upload/image-upload-context'
import { useContext } from 'react'

const useImageUpload = () => useContext(ImageUploadContext)

export default useImageUpload
