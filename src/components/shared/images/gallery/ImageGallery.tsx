import React, { useEffect, useState } from 'react'
import { ImageUpload } from '../../../../types/media'
import { ImageList, ImageListItem } from '@mui/material'
import styles from './ImageGallery.module.scss'

type ImageGalleryProps = {
  images: ImageUpload[]
}

type ImageLink = {
  url: string;
  identifier: string;
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [imageLinks, setImageLinks] = useState<ImageLink[]>([])

  useEffect(() => {
    const mappedImages: ImageLink[] = images.map((item) => ({
      url: `${process.env.REACT_APP_STORAGE_BUCKET_BASE_URL + item.identifier}`,
      identifier: item.identifier
    }))

    setImageLinks(mappedImages)
  }, [images])

  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const onClickUrl = (url: string): (() => void) => () => openInNewTab(url)

  return <>
    <ImageList cols={6} gap={8}>
      {imageLinks.map((item, index) => (
        <ImageListItem key={index}>
          <img
            className={styles.image}
            src={item.url}
            alt={item.identifier}
            loading="lazy"
            onClick={onClickUrl(item.url)}
          />
        </ImageListItem>
      ))}
    </ImageList>
  </>
}

export default ImageGallery
