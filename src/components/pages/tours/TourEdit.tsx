import Typography from '@mui/material/Typography'
import { Tour, UpdateOrCreateTour } from '../../../types/tour'
import TourForm from '../../../components/app/TourForm'
import ToursService from '../../../services/tours/tours-service'
import { handleSave } from '../../../types/handle-save'
import { useNavigate, useParams } from 'react-router'
import useAuth from '../../../hooks/use-auth'
import React, { useEffect, useState } from 'react'
import { plainToInstance } from 'class-transformer'
import Loader from '../../shared/Loader'

const EditTour = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const auth = useAuth()
  const [tour, setTour] = useState<UpdateOrCreateTour | undefined>(undefined)
  const service = new ToursService(auth.token)

  useEffect(() => {
    async function fetchTour () {
      const tour: Tour = await service.findOne(id!)
      setTour(plainToInstance<Tour, Tour>(Tour, tour, { excludeExtraneousValues: true }))
    }

    fetchTour()
  }, [])

  const handleSave: handleSave<UpdateOrCreateTour> = async (tour: UpdateOrCreateTour) => {
    const result = await service.update(id!, tour) // todo: handle errors
    if (result.ok) {
      navigate('/tours')
    }
  }

  if (!tour) {
    return (<Loader />)
  }
  return (
    <>
      <Typography variant="h2" gutterBottom component="div">
        Edit Tour
      </Typography>
      <TourForm tour={tour} handleSave={handleSave} type={'Edit'}/>
    </>
  )
}

export default EditTour
