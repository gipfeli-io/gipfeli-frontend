import React from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './ImageUpload.module.scss'
import useImageUpload from '../../../../hooks/use-image-upload'
import ImageUploadEntries from './ImageUploadEntries'

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

      <ImageUploadEntries/>
    </>
  )
}

export default ImageUpload
