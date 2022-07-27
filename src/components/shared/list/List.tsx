import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import ListActions, { ListActionsProps } from './ListActions'

type IdentifiableObject = {
  id: string;
}

type ListProps<T extends IdentifiableObject> = {
  rows: T[],
  loading: boolean,
  columns: GridColDef[],
  /**
   * Override function to write custom logic for deletion, e.g. to prevent admins from being deleted.
   * @param item
   */
  customDeleteOverride?: (item: T) => boolean,
} & Omit<ListActionsProps, 'id'>

const List = <T extends IdentifiableObject>({
  loading,
  rows,
  columns,
  canView = false,
  canEdit = false,
  canDelete = false,
  customDeleteOverride = () => canDelete
}: ListProps<T>) => {
  const [internalColumns, setInternalColumns] = useState<GridColDef[]>([])

  const getActions = (params: GridValueGetterParams<T, T>): JSX.Element => {
    return <ListActions id={params.row.id} canView={canView} canEdit={canEdit}
                        canDelete={customDeleteOverride(params.row)}/>
  }

  useEffect(() => {
    if (canView || canEdit || canDelete) {
      const actionsColumn: GridColDef = {
        hideSortIcons: true,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        minWidth: 100,
        maxWidth: 100,
        align: 'center',
        renderCell: getActions
      }
      setInternalColumns(() => ([
        ...columns,
        actionsColumn
      ]))
    } else {
      setInternalColumns(columns)
    }
  }, [])

  return (
    <>
      <div style={{ width: '100%' }}>
        <DataGrid
          loading={loading}
          autoHeight
          disableColumnSelector
          disableSelectionOnClick
          rows={rows}
          columns={internalColumns}/>
      </div>
    </>
  )
}
export default List
