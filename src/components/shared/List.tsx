import { DataGrid, gridClasses, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EntryManagementActions, { ListActionsProps } from './EntryManagementActions'
import { SxProps } from '@mui/material'
import Typography from '@mui/material/Typography'

/**
 * This workaround is needed to remove the focus of DataGrid columns. Unfortunately, MUI does not allow to remove this
 * with a prop, so we need to style the component directly.
 *
 * See https://github.com/mui/mui-x/issues/2429#issuecomment-1241756853
 */
const removeCellFocusWorkAround: SxProps = {
  [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
    outline: 'none'
  },
  [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
    {
      outline: 'none'
    }
}

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
    return <EntryManagementActions id={params.row.id} canView={canView} canEdit={canEdit}
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
  }, [columns])

  return (
    <>
      <div style={{ width: '100%' }}>
        <DataGrid
          loading={loading}
          autoHeight
          disableColumnSelector
          disableSelectionOnClick
          rows={rows}
          columns={internalColumns}
          sx={removeCellFocusWorkAround}
        />
        <Typography
          variant="caption"
          component="div"
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          The table can be scrolled horizontally for more data.
        </Typography>
      </div>
    </>
  )
}
export default List
