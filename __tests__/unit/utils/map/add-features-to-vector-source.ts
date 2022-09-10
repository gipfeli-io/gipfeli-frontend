import '@testing-library/jest-dom'
import { GeometryObject } from '../../../../src/types/map'
import { GeoJsonObject, Point } from 'geojson'
import addFeaturesToVectorSource from '../../../../src/utils/map/add-features-to-vector-source'
import VectorSource from 'ol/source/Vector'
import { Extent } from 'ol/extent'

export class MockGeometryObject extends GeometryObject {
  location: Point | null

  constructor (location: Point | null = null) {
    super()
    this.location = location
  }

  public getGeometry (): GeoJsonObject | null {
    return this.location
  }
}

const mockPoint: Point = {
  type: 'Point',
  coordinates: [8.0, 40.0]
}

describe('addFeaturesToVectorSource', () => {
  let mockSource: VectorSource

  beforeEach(() => {
    mockSource = new VectorSource()
  })

  it('does not add to layer and returns an empty extent if no features are added', () => {
    const addFeatureSpy = jest.spyOn(mockSource, 'addFeatures')
    const getExtentSpy = jest.spyOn(mockSource, 'getExtent')
    const features: MockGeometryObject[] = []

    const result = addFeaturesToVectorSource(features, mockSource, jest.fn())

    expect(addFeatureSpy).not.toHaveBeenCalled()
    expect(getExtentSpy).not.toHaveBeenCalled()
    expect(result).toEqual([])
  })

  it('adds element to layer and returns an empty extent if 1 feature is added', () => {
    const addFeatureSpy = jest.spyOn(mockSource, 'addFeatures')
    const getExtentSpy = jest.spyOn(mockSource, 'getExtent')
    const features: MockGeometryObject[] = [new MockGeometryObject(mockPoint)]

    const result = addFeaturesToVectorSource(features, mockSource, jest.fn())

    expect(addFeatureSpy).toHaveBeenCalled()
    expect(getExtentSpy).not.toHaveBeenCalled()
    expect(result).toEqual([])
  })

  it('adds elements to layer and returns the extent if more than one features is added', () => {
    const mockExtent: Extent = [50.0, 20.0, 40.0, 10.0]
    const addFeatureSpy = jest.spyOn(mockSource, 'addFeatures')
    const getExtentSpy = jest.spyOn(mockSource, 'getExtent').mockReturnValue(mockExtent)
    const features: MockGeometryObject[] = [new MockGeometryObject(mockPoint), new MockGeometryObject(mockPoint)]

    const result = addFeaturesToVectorSource(features, mockSource, jest.fn())

    expect(addFeatureSpy).toHaveBeenCalled()
    expect(getExtentSpy).toHaveBeenCalled()
    expect(result).toEqual(mockExtent)
  })

  it('does nothing if element has no geometry and returns an empty extent', () => {
    const addFeatureSpy = jest.spyOn(mockSource, 'addFeatures')
    const getExtentSpy = jest.spyOn(mockSource, 'getExtent')
    const features: MockGeometryObject[] = [new MockGeometryObject()]

    const result = addFeaturesToVectorSource(features, mockSource, jest.fn())

    expect(addFeatureSpy).not.toHaveBeenCalled()
    expect(getExtentSpy).not.toHaveBeenCalled()
    expect(result).toEqual([])
  })

  it('calls the passed style selector function with the correct arguments', () => {
    const mockPoint1 = new MockGeometryObject(mockPoint)
    const mockPoint2 = new MockGeometryObject({
      type: 'Point',
      coordinates: [12.0, 20.0]
    })

    const styleSelectorMock = jest.fn()
    const features: MockGeometryObject[] = [mockPoint1, mockPoint2]

    addFeaturesToVectorSource(features, mockSource, styleSelectorMock)

    const expectedCallArgs = [
      [0, [mockPoint1, mockPoint2]],
      [1, [mockPoint1, mockPoint2]]
    ]
    expect(styleSelectorMock).toHaveBeenCalledTimes(2)
    expect(styleSelectorMock.mock.calls).toEqual(expectedCallArgs)
  })

  it('calls the passed propertysetter function with the correct arguments', () => {
    const mockPoint1 = new MockGeometryObject(mockPoint)
    const mockPoint2 = new MockGeometryObject({
      type: 'Point',
      coordinates: [12.0, 20.0]
    })

    const propertySetterMock = jest.fn()
    const features: MockGeometryObject[] = [mockPoint1, mockPoint2]

    addFeaturesToVectorSource(features, mockSource, jest.fn(), propertySetterMock)

    const expectedCallArgs = [
      [mockPoint1],
      [mockPoint2]
    ]
    expect(propertySetterMock).toHaveBeenCalledTimes(2)
    expect(propertySetterMock.mock.calls).toEqual(expectedCallArgs)
  })
})
