import React from 'react'
import { Alert, AlertTitle } from '@mui/material'
import useAuth from '../../../hooks/use-auth'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { email } = useAuth()
  return (
    <Alert severity={'info'} sx={{ mt: 2 }}>
      <AlertTitle>{`Hi, ${email}!`}</AlertTitle>
      There is not much you can do here currently, but in the future, you will be able to change your profile data here.
      Currently, you may <Link to={'reset'} color={'inherit'}>reset your local data</Link>, which is useful when you
      have weird errors.</Alert>
  )
}

export default Profile
