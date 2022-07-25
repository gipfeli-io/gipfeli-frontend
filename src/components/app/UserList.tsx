import React from 'react'
import List from '../shared/list/List'
import { User } from '../../types/user'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import DoneIcon from '@mui/icons-material/Done'
import { UserRole } from '../../enums/user-role'
import CloseIcon from '@mui/icons-material/Close'

type UserListProps = {
  rows: User[],
  loading: boolean,
}

const UserList = ({ loading, rows }: UserListProps) => {
  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Name', flex: 2 },
    { field: 'firstName', headerName: 'First Name', flex: 2 },
    { field: 'lastName', headerName: 'Last Name', flex: 2 },
    {
      field: 'role',
      headerName: 'Is admin',
      flex: 1,
      renderCell: (params: GridRenderCellParams<UserRole>) => {
        return params.value === UserRole.ADMINISTRATOR ? <DoneIcon/> : <CloseIcon/>
      }
    }
  ]

  const preventAdminsFromBeingDeleted = (user: User) => {
    return user.role !== UserRole.ADMINISTRATOR
  }

  return <List
    loading={loading}
    rows={rows}
    columns={columns}
    canDelete
    customDeleteOverride={preventAdminsFromBeingDeleted}
  />
}
export default UserList
