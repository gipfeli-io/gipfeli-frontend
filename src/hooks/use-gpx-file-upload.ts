import { useContext } from 'react'
import GpxFileUploadContext from '../contexts/gpx-file-upload-context'

const useGpxFileUpload = () => useContext(GpxFileUploadContext)

export default useGpxFileUpload
