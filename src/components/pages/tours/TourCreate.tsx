import { useNavigate } from 'react-router'
import useAuth from '../../../hooks/use-auth'
import ToursService from '../../../services/tours/tours-service'
import React from 'react'
import { UpdateOrCreateTour } from '../../../types/tour'
import { handleSave } from '../../../types/handle-save'
import Typography from '@mui/material/Typography'
import TourForm from '../../app/TourForm'
import useNotifications from '../../../hooks/use-notifications'

const TourCreate = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const { triggerSuccessNotification } = useNotifications()
  const service = new ToursService(auth.token)

  const tour: UpdateOrCreateTour = {
    name: '',
    description: '',
    startLocation: { // Todo: make empty and add points in edit
      type: 'Point',
      coordinates: []
    },
    endLocation: {
      type: 'Point',
      coordinates: []
    }
  }

  const handleSave: handleSave<UpdateOrCreateTour> = async (tour: UpdateOrCreateTour) => {
    const newTour = await service.create(tour) // todo: handle errors
    if (newTour.success) {
      triggerSuccessNotification('Created new tour!')
      navigate(`/tours/${newTour.content!.id}`)
    } else {
      throw Error('something bad happened')
    }
  }

  return (
    <>
      <Typography variant="h2" gutterBottom component="div">
        Create Tour
      </Typography>
      <TourForm tour={tour} handleSave={handleSave} type={'Create'}/>
    </>
  )
}

export default TourCreate
