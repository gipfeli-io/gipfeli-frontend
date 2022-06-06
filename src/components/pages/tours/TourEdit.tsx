import Typography from '@mui/material/Typography'
import { UpdateOrCreateTour } from '../../../types/tour'
import TourForm from '../../../components/app/TourForm'
import ToursService from '../../../services/tours/tours-service'
import { handleSave } from '../../../types/handle-save'
import { useNavigate, useParams } from 'react-router'
import useAuth from '../../../hooks/use-auth'
import React, { useEffect, useState } from 'react'
import Loader from '../../shared/Loader'
import useNotifications from '../../../hooks/use-notifications'

const EditTour = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const auth = useAuth()
  const { triggerSuccessNotification } = useNotifications()
  const [tour, setTour] = useState<UpdateOrCreateTour | undefined>(undefined)
  const service = new ToursService(auth.token)

  useEffect(() => {
    async function fetchTour () {
      const data = await service.findOne(id!)
      if (data.success) {
        const { description, endLocation, startLocation, name } = data.content!
        setTour({ description, endLocation, startLocation, name })
      } else {
        throw Error('something bad happened')
      }
    }

    fetchTour()
  }, [])

  const handleSave: handleSave<UpdateOrCreateTour> = async (tour: UpdateOrCreateTour) => {
    await service.update(id!, tour) // todo: handle errors
    triggerSuccessNotification('Successfully updated tour!')
    navigate(`/tours/${id}`)
  }

  if (!tour) {
    return (<Loader/>)
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
