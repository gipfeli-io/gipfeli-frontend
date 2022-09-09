import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/use-auth'
import useNotifications from '../../../hooks/use-notifications'
import useApiError from '../../../hooks/use-api-error'
import UsersService from '../../../services/users/users-service'
import { User } from '../../../types/user'
import UserList from '../../app/UserList'
import { Alert } from '@mui/material'
import DeleteConfirmation from '../../shared/confirmation/DeleteConfirmation'
import DeleteEntryContextProvider from '../../providers/DeleteEntryContextProvider'

const UsersOverview = () => {
  const { token } = useAuth()
  const { triggerSuccessNotification } = useNotifications()
  const service = new UsersService(token)
  const [userList, setUserList] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const throwError = useApiError()

  useEffect(() => {
    async function fetchUsers () {
      const data = await service.findAll()
      if (data.success) {
        setUserList(data.content!)
      } else {
        throwError(data)
      }
      setLoading(false)
    }

    fetchUsers()
  }, [token])

  const triggerDeletionSuccessForId = (deleteId: string) => {
    triggerSuccessNotification('Successfully deleted user!')
    setUserList(prevState => prevState.filter(tour => tour.id !== deleteId))
  }

  const handleDelete = async (deleteId: string) => {
    const data = await service.delete(deleteId)
    if (data.success) {
      triggerDeletionSuccessForId(deleteId)
    } else {
      throwError(data)
    }
  }

  return (
    <>
      <Alert severity="info" sx={{ mt: 2, mb: 2 }}>Currently, only normal users can be deleted.</Alert>
      <DeleteEntryContextProvider>
        <UserList rows={userList} loading={loading}/>
        <DeleteConfirmation handleDelete={handleDelete}/>
      </DeleteEntryContextProvider>
    </>
  )
}

export default UsersOverview
