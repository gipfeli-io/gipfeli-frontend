import Typography from '@mui/material/Typography'
import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TourListContext from '../../app/tour-list/TourListContext'
import { TourDeleteConfirmation } from '../../app/tour-list/TourDeleteConfirmation'
import TourList from '../../app/tour-list/TourList'
import ToursService from '../../../services/tours/tours-service'
import { Tour } from '../../../types/tour'
import useAuth from '../../../hooks/use-auth'
import { Link } from 'react-router-dom'
import useNotifications from '../../../hooks/use-notifications'
import useApiError from '../../../hooks/use-api-error'
import { TourListContextProperties } from '../../../types/contexts'
import useConnectionStatus from '../../../hooks/use-connection-status'
import LocalDatabaseService from '../../../services/local-database-service'

const ToursOverview = () => {
  const { token } = useAuth()
  const { triggerSuccessNotification } = useNotifications()
  const service = new ToursService(token)
  const [tourList, setTourList] = useState<Tour[]>([])
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const throwError = useApiError()
  const { isOffline } = useConnectionStatus()
  const localDatabaseService = new LocalDatabaseService()

  useEffect(() => {
    async function fetchTours () {
      if (isOffline()) {
        const tours = await localDatabaseService.findAllTours() // todo: handle dexie error
        setTourList(tours)
        setLoading(false)
      } else {
        const data = await service.findAll()
        if (data.success) {
          setTourList(data.content!)
        } else {
          throwError(data)
        }
        setLoading(false)
      }
    }

    fetchTours()
  }, [token])

  const handleDeleteModalClose = () => {
    setDeleteId(null)
    setOpen(false)
  }

  const triggerDeletionSuccess = () => {
    triggerSuccessNotification('Successfully deleted tour!')
    setTourList(prevState => prevState.filter(tour => tour.id !== deleteId))
  }
  const handleDelete = async () => {
    if (isOffline()) {
      await localDatabaseService.markTourAsDeleted(deleteId!)
      triggerDeletionSuccess()
    } else {
      const data = await service.delete(deleteId!)
      if (data.success) {
        triggerDeletionSuccess()
      } else {
        throwError(data)
      }
    }

    handleDeleteModalClose()
  }

  const deleteHandler: TourListContextProperties = {
    deleteEvent: id => {
      setOpen(true)
      setDeleteId(id)
    }
  }

  return (
    <>
      <Typography variant="h2" gutterBottom component="div" sx={{ mt: 2 }}>
        My Tours
      </Typography>
      <Grid container mb={2} direction={'row'} justifyContent="flex-end">
        <Grid item>
          <Button component={Link} to="create" variant="contained">
            Add Tour
          </Button>
        </Grid>
      </Grid>
      <TourListContext.Provider value={deleteHandler}>
        <TourList rows={tourList} loading={loading}/>
      </TourListContext.Provider>
      <TourDeleteConfirmation open={open} onClose={handleDeleteModalClose} onClick={handleDelete}/>
    </>
  )
}

export default ToursOverview
