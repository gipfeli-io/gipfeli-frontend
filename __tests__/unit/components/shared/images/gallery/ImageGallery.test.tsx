import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import ImageGallery from '../../../../../../src/components/shared/images/gallery/ImageGallery'
import { ImageUpload } from '../../../../../../src/types/media'
import renderer from 'react-test-renderer'

const mockedStorageUrl = 'https://localhost:3000/'
const mockedImages: ImageUpload[] = [
  { id: 'img-1', identifier: 'ident-1' },
  { id: 'img-2', identifier: 'ident-2' }
]
describe('ImageGallery', () => {
  beforeEach(() => {
    process.env.REACT_APP_STORAGE_BUCKET_BASE_URL = mockedStorageUrl
  })
  it('renders a list of images with the correct url', () => {
    const { container } = render(
      <ImageGallery images={mockedImages}/>
    )

    const imgTags = container.querySelectorAll('img')

    expect(imgTags.length).toEqual(mockedImages.length)
    expect(imgTags[0].src).toEqual(`${mockedStorageUrl}${mockedImages[0].identifier}`)
    expect(imgTags[1].src).toEqual(`${mockedStorageUrl}${mockedImages[1].identifier}`)
  })

  it('behaves consistently', () => {
    const tree = renderer
      .create(<ImageGallery images={mockedImages}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('has a click listener for opening a new window with the image url', () => {
    const windowSpy = jest.spyOn(window, 'open').mockImplementation(jest.fn())
    const { container } = render(
      <ImageGallery images={mockedImages}/>
    )
    const firstImage = container.querySelectorAll('img')[0]

    fireEvent.click(firstImage)

    const expectedParams = [
      `${mockedStorageUrl}${mockedImages[0].identifier}`,
      '_blank',
      'noopener,noreferrer'
    ]
    expect(windowSpy).toHaveBeenCalledTimes(1)
    expect(windowSpy).toHaveBeenCalledWith(...expectedParams)
  })
})
