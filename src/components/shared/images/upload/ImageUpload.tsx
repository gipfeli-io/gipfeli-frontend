import React from 'react'
import { useDropzone } from 'react-dropzone'
import styles from '../../media/upload/MediaUpload.module.scss'
import useImageUpload from '../../../../hooks/use-image-upload'
import ImageUploadEntries from './ImageUploadEntries'
import ImageUploadProgress from './ImageUploadProgress'
import Typography from '@mui/material/Typography'

const ImageUpload = () => {
  const { save } = useImageUpload()

  const onDrop = (acceptedFiles: File[]) => {
    save(acceptedFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        <p>{
          isDragActive
            ? 'Drop the images here ...'
            : 'Drag and drop some files here, or click to select files'
        }
        </p>
      </div>
      <Typography variant="caption" component="div">
        Only images (jpg, jpeg, png, gif) with a maximum size of 2MB are supported.
      </Typography>
      <ImageUploadProgress />
      <ImageUploadEntries/>
    </>
  )
}

export default ImageUpload
