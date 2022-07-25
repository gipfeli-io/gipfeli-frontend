import React, { useEffect, useState } from 'react'
import { TourDeleteConfirmation } from '../../app/tour-list/TourDeleteConfirmation'
import useAuth from '../../../hooks/use-auth'
import useNotifications from '../../../hooks/use-notifications'
import useApiError from '../../../hooks/use-api-error'
import { ListContextProperties } from '../../../types/contexts'
import UsersService from '../../../services/users/users-service'
import { User } from '../../../types/user'
import UserList from '../../app/user-list/UserList'
import ListContext from '../../shared/list/ListContext'

const UsersOverview = () => {
  const { token } = useAuth()
  const { triggerSuccessNotification } = useNotifications()
  const service = new UsersService(token)
  const [userList, setUserList] = useState<User[]>([])
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
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

  const handleDeleteModalClose = () => {
    setDeleteId(null)
    setOpen(false)
  }

  const triggerDeletionSuccess = () => {
    triggerSuccessNotification('Successfully deleted user!')
    setUserList(prevState => prevState.filter(tour => tour.id !== deleteId))
  }

  const handleDelete = async () => {
    const data = await service.delete(deleteId!)
    if (data.success) {
      triggerDeletionSuccess()
    } else {
      throwError(data)
    }

    handleDeleteModalClose()
  }

  const deleteHandler: ListContextProperties = {
    deleteEvent: id => {
      setOpen(true)
      setDeleteId(id)
    }
  }

  return (
    <>
      <ListContext.Provider value={deleteHandler}>
        <UserList rows={userList} loading={loading}/>
      </ListContext.Provider>
      <TourDeleteConfirmation open={open} onClose={handleDeleteModalClose} onClick={handleDelete}/>
    </>
  )
}

export default UsersOverview
