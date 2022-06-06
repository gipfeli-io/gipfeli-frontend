import Typography from '@mui/material/Typography'
import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TourListContext, { TourListContextProperties } from '../../app/tour-list/TourListContext'
import { TourDeleteConfirmation } from '../../app/tour-list/TourDeleteConfirmation'
import TourList from '../../app/tour-list/TourList'
import ToursService from '../../../services/tours/tours-service'
import { Tour } from '../../../types/tour'
import useAuth from '../../../hooks/use-auth'
import { Link } from 'react-router-dom'
import useNotifications from '../../../hooks/use-notifications'

const ToursOverview = (): JSX.Element => {
  const { token } = useAuth()
  const { triggerSuccessNotification } = useNotifications()
  const service = new ToursService(token)
  const [tourList, setTourList] = useState<Tour[]>([])
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchTours () {
      const data = await service.findAll()
      if (data.success) {
        if (data.content) {
          setTourList(data.content)
        } else {
          setTourList([])
        }
      } else {
        throw Error('something bad happened')
      }
      setLoading(false)
    }

    fetchTours()
  }, [token])

  const handleDeleteModalClose = () => {
    setDeleteId(null)
    setOpen(false)
  }

  const handleDelete = async () => {
    await service.delete(deleteId!)
    triggerSuccessNotification('Successfully deleted tour!')
    setTourList(prevState => prevState.filter(tour => tour.id !== deleteId))
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
      <Typography variant="h2" gutterBottom component="div">
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
