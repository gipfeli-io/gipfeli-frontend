import React from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './ImageUpload.module.scss'

type ImageUploadProps = {
  handleUpload: (files: File[]) => void
}

const ImageUpload = ({ handleUpload }: ImageUploadProps) => {
  const onDrop = (acceptedFiles: File[]) => {
    handleUpload(acceptedFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps({ className: styles.dropzone })}>
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>Drop the images here ...</p>
          : <p>Drag n drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default ImageUpload
