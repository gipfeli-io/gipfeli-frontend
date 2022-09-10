import MapConfigurationService from '../../../src/services/map/map-configuration-service'
import { MarkerSize } from '../../../src/enums/marker-size'
import { FeatureLike } from 'ol/Feature'

jest.mock('../../../src/static/img/map/pin_start_of_tour.png')

/**
 * Note that we do not check for the actual images, because we can just "generally" mock images with our fileMock, not
 * specific images. However, if the image would fail, openlayers would throw an error, so we can check for sizes and
 * other props.
 *
 * As for the caching, we use expect(a).toBe(b), which does a referential integrity check. So we compare two instances
 * and check whether they are the same instance, and not just two instances with equal properties.
 */
describe('MapConfigurationService', () => {
  describe('getStartIcon', () => {
    it('returns properly sized icon', () => {
      const result = MapConfigurationService.getStartIcon()
      expect(result.getImage().getScale()).toEqual(MarkerSize.DEFAULT)
    })

    it('uses the cache if requested more than once', () => {
      const result = MapConfigurationService.getStartIcon()
      const resultTwo = MapConfigurationService.getStartIcon()

      expect(result).toBe(resultTwo)
    })
  })

  describe('getEndIcon', () => {
    it('returns properly sized icon', () => {
      const result = MapConfigurationService.getEndIcon()
      expect(result.getImage().getScale()).toEqual(MarkerSize.DEFAULT)
    })

    it('uses the cache if requested more than once', () => {
      const result = MapConfigurationService.getEndIcon()
      const resultTwo = MapConfigurationService.getEndIcon()

      expect(result).toBe(resultTwo)
    })
  })

  describe('getBasicGpsImageIcon', () => {
    it('returns the same icon if it is a feature or undefined, and a different if it is a cluster', () => {
      // Since we cannot test the actual images that are returned, we just check whether empty returns the same from
      // cache. To do this, we mock a FeatureLike and its get() method, which returns an array. If it has two or more
      // objects, we mimick a cluster.
      const mockFeature: FeatureLike = { get: () => ['mock'] } as unknown as FeatureLike
      const mockCluster: FeatureLike = { get: () => ['mock', 'mock'] } as unknown as FeatureLike
      const result = MapConfigurationService.getBasicGpsImageIcon(mockFeature)
      const resultTwo = MapConfigurationService.getBasicGpsImageIcon()
      const resultCluster = MapConfigurationService.getBasicGpsImageIcon(mockCluster)

      expect(result.getImage().getScale()).toEqual(MarkerSize.DEFAULT)
      expect(result).toBe(resultTwo)
      expect(result).not.toBe(resultCluster)
    })

    it('uses the cache if requested more than once', () => {
      const result = MapConfigurationService.getBasicGpsImageIcon()
      const resultTwo = MapConfigurationService.getBasicGpsImageIcon()

      expect(result).toBe(resultTwo)
    })
  })

  describe('getGpsImageIconWithinCluster', () => {
    it('returns properly sized icon', () => {
      const result = MapConfigurationService.getGpsImageIconWithinCluster()
      expect(result.getImage().getScale()).toEqual(MarkerSize.CLUSTERED)
    })

    it('uses the cache if requested more than once', () => {
      const result = MapConfigurationService.getGpsImageIconWithinCluster()
      const resultTwo = MapConfigurationService.getGpsImageIconWithinCluster()

      expect(result).toBe(resultTwo)
    })
  })

  describe('getSelectedGpsImageIcon', () => {
    it('returns properly sized icons depending on whether it is a  cluster or not', () => {
      const mockFeature: FeatureLike = { get: () => ['mock'] } as unknown as FeatureLike
      const mockCluster: FeatureLike = { get: () => ['mock', 'mock'] } as unknown as FeatureLike
      const resultFeature = MapConfigurationService.getSelectedGpsImageIcon(mockFeature)
      const resultCluster = MapConfigurationService.getSelectedGpsImageIcon(mockCluster)

      expect(resultFeature.getImage().getScale()).toEqual(MarkerSize.SELECTED)
      expect(resultCluster.getImage().getScale()).toEqual(MarkerSize.DEFAULT)
    })

    it('uses the cache if requested more than once', () => {
      const mockFeature: FeatureLike = { get: () => ['mock'] } as unknown as FeatureLike
      const result = MapConfigurationService.getSelectedGpsImageIcon(mockFeature)
      const resultTwo = MapConfigurationService.getSelectedGpsImageIcon(mockFeature)

      expect(result).toBe(resultTwo)
    })
  })
})
