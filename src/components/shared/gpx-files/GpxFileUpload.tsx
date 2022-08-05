import React from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './ImageUpload.module.scss'
import Typography from '@mui/material/Typography'
import useGpxFileUpload from '../../../hooks/use-gpx-file-upload'
import MediaUploadProgress from '../media/upload/MediaUploadProgress'
import GpxFileUploadEntry from './GpxFileUploadEntry'

const GpxFileUpload = () => {
  const { save } = useGpxFileUpload()
  const onDrop = (acceptedFiles: File[]) => {
    save(acceptedFiles[0])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false })

  return (
    <>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        <p>{
          isDragActive
            ? 'Drop a gpx files here ...'
            : 'Drag and drop the file here, or click to select one'
        }
        </p>
      </div>
      <Typography variant="caption" component="div">
        Only gpx files (.gpx) with a maximum size of 2MB are supported.
      </Typography>
      <MediaUploadProgress />
      <GpxFileUploadEntry/>
    </>
  )
}

export default GpxFileUpload
