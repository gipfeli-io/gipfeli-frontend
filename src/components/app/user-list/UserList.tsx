import { GridColDef } from '@mui/x-data-grid'
import React from 'react'

import List from '../../shared/list/List'
import { User } from '../../../types/user'

type UserListProps = {
  rows: User[],
  loading: boolean,
}

const columns: GridColDef[] = [
  { field: 'email', headerName: 'Name', flex: 2 }
]

const UserList = ({ loading, rows }: UserListProps) => (
  <div style={{ width: '100%' }}>
    <List
      loading={loading}
      rows={rows}
      columns={columns}
      canDelete
    />
  </div>
)
export default UserList
