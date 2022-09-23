import { Tour, UpdateOrCreateTour } from '../types/tour'
import { localDB } from '../utils/local-database/local-db'
import dayjs from 'dayjs'
import { TourStatusType } from '../enums/tour-status-type'
import { IndexableType } from 'dexie'
import jwtDecode from 'jwt-decode'
import { AccessToken } from '../types/auth'
import { SingleApiResponse } from '../types/api'
import { v4 as uuidv4 } from 'uuid'

export default class LocalDatabaseService {
  private readonly userId: string | undefined

  constructor (token: string | undefined) {
    let userId
    if (token) {
      const { sub } = jwtDecode<AccessToken>(token)
      userId = sub
    }
    this.userId = userId
  }

  public async reset (): Promise<void> {
    await localDB.delete()
    await localDB.open()
  }

  public getTourNotFoundResponse (): SingleApiResponse<Tour> {
    return this.getErrorResponse(false, 404, 'Tour was not found')
  }

  public getErrorResponse (success: boolean, statusCode: number, statusMessage: string): SingleApiResponse<Tour> {
    const wrapper = { success, statusCode, statusMessage }
    return { ...wrapper }
  }

  public async addTourList (tours: Tour[]): Promise<void> {
    await localDB.transaction('rw', localDB.tours, async () => {
      // remove all synced tours
      const syncedTours = await localDB.tours.where('status').equals(TourStatusType.SYNCED)
        .and((tour: Tour) => tour.userId === this.userId!).toArray()
      await localDB.tours.bulkDelete(syncedTours.map((tour: Tour) => tour.id))

      for (const tour of tours) {
        await localDB.tours.put(tour)
      }
    })
  }

  public async findAllTours (): Promise<Tour[]> {
    return localDB.tours.where('status').notEqual(TourStatusType.DELETED).and((tour: Tour) => tour.userId === this.userId).toArray()
  }

  public async create (tour: UpdateOrCreateTour): Promise<IndexableType> {
    const newTour = this.createLocalTour(tour)
    return this.putTour(newTour)
  }

  /**
   * If a tour does not exist in the table it will be created
   * If it exists it will be updated
   * @param tour
   */
  public async putTour (tour: Tour): Promise<IndexableType> {
    return localDB.tours.put(tour)
  }

  public async getOne (id: string | undefined): Promise<Tour | undefined> {
    return localDB.tours.where('userId').equals(this.userId!).and((tour: Tour) => tour.id === id!).first()
  }

  public async markTourAsDeleted (id: string | undefined): Promise<void> {
    if (!id) {
      return
    }
    const localTour = await localDB.tours.get(id)
    if (localTour) {
      await this.updateTourStatus(localTour, TourStatusType.DELETED)
    }
  }

  public async deleteTour (id: string | undefined): Promise<void> {
    await localDB.tours.delete(id!)
  }

  public async update (tourId: string | undefined, updatedTour: UpdateOrCreateTour, statusType: TourStatusType): Promise<IndexableType | undefined> {
    if (!tourId) {
      return
    }
    const localTour = await localDB.tours.get(tourId)
    if (!localTour) {
      return
    }
    const localUpdateTour = LocalDatabaseService.updateLocalTour(localTour, updatedTour, statusType)
    return localDB.tours.put(localUpdateTour)
  }

  public async getToursToSynchronize (): Promise<Tour[]> {
    return localDB.tours.where('status').anyOf(TourStatusType.UPDATED, TourStatusType.DELETED).toArray()
  }

  public async updateTourStatus (tour: Tour, status: TourStatusType): Promise<void> {
    tour.status = status
    await localDB.tours.put(tour)
  }

  private static updateLocalTour (localTour: Tour, updatedTour: UpdateOrCreateTour, statusType: TourStatusType): Tour {
    localTour.name = updatedTour.name
    localTour.startLocation = updatedTour.startLocation
    localTour.endLocation = updatedTour.endLocation
    localTour.description = updatedTour.description
    localTour.images = updatedTour.images
    localTour.categories = updatedTour.categories
    localTour.updatedAt = dayjs().toDate()
    localTour.status = statusType
    return localTour
  }

  private createLocalTour (tour: UpdateOrCreateTour): Tour {
    const id = uuidv4()
    const localTour = new Tour(id, tour.name, tour.startLocation, tour.endLocation, tour.description, this.userId!, dayjs().toDate(), dayjs().toDate(), tour.categories)
    localTour.status = TourStatusType.CREATED
    return localTour
  }
}
