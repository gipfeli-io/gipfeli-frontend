import { Tour } from '../../../types/tour'
import { DataGrid, GridColDef, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid'
import TourListActions from './TourListActions'
import React from 'react'
import dayjs from 'dayjs'
import { dateTimeFormat } from '../../../utils/constants'
import { OfflineBolt } from '@mui/icons-material'
import { TourStatusType } from '../../../enums/tour-status-type'

type TourListProps = {
  rows: Tour[],
  loading: boolean,
}

const getActions = (params: GridValueGetterParams<Tour, Tour>): JSX.Element => {
  return <TourListActions id={params.row.id} />
}

const getName = (params: GridValueGetterParams<Tour, Tour>): JSX.Element => {
  const fieldValue: JSX.Element =
    params.row.status === TourStatusType.SYNCED
      ? <>{params.row.name}</>
      : <><span title="This tour is not synchronized with the database."><OfflineBolt sx={{ mr: 1 }}/></span>{params.row.name} </>
  return fieldValue
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 2, renderCell: getName },
  {
    field: 'createdAt',
    headerName: 'Created at',
    type: 'dateTime',
    valueFormatter: (params: GridValueFormatterParams) => { return dayjs(params.value).format(dateTimeFormat) },
    flex: 1
  },
  {
    field: 'updatedAt',
    headerName: 'Updated at',
    type: 'dateTime',
    valueFormatter: (params: GridValueFormatterParams) => { return dayjs(params.value).format(dateTimeFormat) },
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
