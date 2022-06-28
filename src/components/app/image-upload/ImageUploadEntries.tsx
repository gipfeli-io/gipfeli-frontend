import React from 'react'
import useImageUpload from '../../../hooks/use-image-upload'
import { Button } from '@mui/material'

const ImageUploadEntries = () => {
  const { files, remove } = useImageUpload()

  if (files.length === 0) {
    return <></>
  }

  return (
    <>
      Uploaded Images:
      {files.map((element, index) => <li key={index}>{element.identifier} <Button
        onClick={() => remove(element.id)}>X</Button></li>)}
    </>
  )
}

export default ImageUploadEntries
