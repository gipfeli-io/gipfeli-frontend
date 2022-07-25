import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Tour } from '../../../types/tour'
import ListActions, { ListActionsProps } from './ListActions'

type ListProps = {
  rows: Object[],
  loading: boolean,
  columns: GridColDef[],
} & Omit<ListActionsProps, 'id'>

const List = ({ loading, rows, columns, canView = false, canEdit = false, canDelete = false }: ListProps) => {
  const [internalColumns, setInternalColumns] = useState<GridColDef[]>([])

  const getActions = (params: GridValueGetterParams<Tour, Tour>): JSX.Element => {
    return <ListActions id={params.row.id} canView={canView} canEdit={canEdit} canDelete={canDelete}/>
  }

  useEffect(() => {
    if (canView || canEdit || canDelete) {
      const actionsColumn: GridColDef = { field: 'actions', headerName: 'Actions', flex: 0.5, renderCell: getActions }
      setInternalColumns(prevState => ([
        ...columns,
        actionsColumn
      ]))
    } else {
      setInternalColumns(columns)
    }
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        loading={loading}
        autoHeight
        disableColumnSelector
        disableSelectionOnClick
        rows={rows}
        columns={internalColumns}/>
    </div>
  )
}
export default List
