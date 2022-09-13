import React from 'react'
import { useDropzone } from 'react-dropzone'

import Typography from '@mui/material/Typography'
import useGpxFileUpload from '../../../../hooks/use-gpx-file-upload'
import GpxFileUploadProgress from './GpxFileUploadProgress'
import GpxFileUploadEntry from './GpxFileUploadEntry'
import styles from '../../media/upload/MediaUpload.module.scss'

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
            ? 'Drop a gpx file here ...'
            : 'Drag and drop the file here, or click to select one'
        }
        </p>
      </div>
      <Typography variant="caption" component="div">
        Only gpx files (.gpx) with a maximum size of 10MB are supported.
      </Typography>
      <GpxFileUploadProgress />
      <GpxFileUploadEntry/>
    </>
  )
}

export default GpxFileUpload
