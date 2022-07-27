import React from 'react'
import List from '../shared/list/List'
import { User } from '../../types/user'
import { GridColDef, GridRenderCellParams, ValueOptions } from '@mui/x-data-grid'
import DoneIcon from '@mui/icons-material/Done'
import { UserRole } from '../../enums/user-role'
import CloseIcon from '@mui/icons-material/Close'

type UserListProps = {
  rows: User[],
  loading: boolean,
}

const UserList = ({ loading, rows }: UserListProps) => {
  const getRoleFilterValues: () => ValueOptions[] = () => {
    const roles: ValueOptions[] = [
      {
        label: 'Yes',
        value: UserRole.ADMINISTRATOR
      },
      {
        label: 'No',
        value: UserRole.USER
      }
    ]
    return roles
  }

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Name', flex: 2, minWidth: 200 },
    { field: 'firstName', headerName: 'First Name', flex: 2, minWidth: 200 },
    { field: 'lastName', headerName: 'Last Name', flex: 2, minWidth: 200 },
    {
      field: 'role',
      type: 'singleSelect',
      valueOptions: getRoleFilterValues,
      headerName: 'Is admin',
      flex: 0.5,
      minWidth: 110,
      align: 'center',
      renderCell: (params: GridRenderCellParams<UserRole>) => {
        return params.value === UserRole.ADMINISTRATOR ? <DoneIcon/> : <CloseIcon/>
      }
    }
  ]

  const preventAdminsFromBeingDeleted = (user: User): boolean => {
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
