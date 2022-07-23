import { Tour } from '../../../types/tour'
import { DataGrid, GridColDef, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid'
import TourListActions from './TourListActions'
import React from 'react'
import { OfflineBolt } from '@mui/icons-material'
import { TourStatusType } from '../../../enums/tour-status-type'
import useConnectionStatus from '../../../hooks/use-connection-status'
import { Chip } from '@mui/material'
import { formatDate } from '../../../utils/date-conversion-helper'

type TourListProps = {
  rows: Tour[],
  loading: boolean,
}

const getActions = (params: GridValueGetterParams<Tour, Tour>): JSX.Element => {
  return <TourListActions id={params.row.id} />
}

const getName = (params: GridValueGetterParams<Tour, Tour>): JSX.Element => {
  const { isOffline } = useConnectionStatus()
  const offlineCreatedChip: JSX.Element = <Chip size="small" sx={{ ml: 1 }} label="Complete to sync" color="primary"/>
  const offlineBolt: JSX.Element = <span title="This tour is not synchronized with the database."><OfflineBolt sx={{ mr: 1 }}/></span>

  if (params.row.status === TourStatusType.SYNCED) {
    return <>{params.row.name}</>
  }

  const fieldValue: JSX.Element =
    isOffline()
      ? <>
        {(params.row.status === TourStatusType.UPDATED || params.row.status === TourStatusType.CREATED) && offlineBolt}
        {params.row.name}
      </>
      : <>
         {params.row.name}
         {params.row.status === TourStatusType.CREATED && offlineCreatedChip}
       </>
  return fieldValue
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 2, renderCell: getName },
  {
    field: 'createdAt',
    headerName: 'Created at',
    type: 'dateTime',
    valueFormatter: (params: GridValueFormatterParams) => { return formatDate(params.value) },
    flex: 1
  },
  {
    field: 'updatedAt',
    headerName: 'Updated at',
    type: 'dateTime',
    valueFormatter: (params: GridValueFormatterParams) => { return formatDate(params.value) },
    flex: 1
  },
  { field: 'actions', headerName: 'Actions', flex: 0.5, renderCell: getActions }
]

const TourList = ({ loading, rows }: TourListProps): JSX.Element => (
  <div style={{ width: '100%' }}>
    <DataGrid
      loading={loading}
      autoHeight
      disableColumnSelector
      disableSelectionOnClick
      rows={rows}
      columns={columns}/>
  </div>
)
export default TourList
