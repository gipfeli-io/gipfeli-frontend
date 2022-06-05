import { useNavigate } from 'react-router'
import useAuth from '../../../hooks/use-auth'
import ToursService from '../../../services/tours/tours-service'
import React from 'react'
import { UpdateOrCreateTour } from '../../../types/tour'
import { handleSave } from '../../../types/handle-save'
import Typography from '@mui/material/Typography'
import TourForm from '../../app/TourForm'

const TourCreate = () => {
  const auth = useAuth()
  const navigate = useNavigate()
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
    await service.create(tour) // todo: handle errors
    navigate('/tours')
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
