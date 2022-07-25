import { Tour } from '../../types/tour'
import { GridColDef, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid'
import React from 'react'
import { OfflineBolt } from '@mui/icons-material'
import { TourStatusType } from '../../enums/tour-status-type'
import useConnectionStatus from '../../hooks/use-connection-status'
import { Chip } from '@mui/material'
import { formatDate } from '../../utils/date-conversion-helper'
import List from '../shared/list/List'

type TourListProps = {
  rows: Tour[],
  loading: boolean,
}

const TourList = ({ loading, rows }: TourListProps) => {
  const getName = (params: GridValueGetterParams<Tour, Tour>): JSX.Element => {
    const { name, status } = params.row
    const { isOffline } = useConnectionStatus()
    const offlineCreatedChip = <Chip size="small" sx={{ ml: 1 }} label="Complete to sync" color="primary"/>
    const offlineBolt = <span title="This tour is not synchronized with the database."><OfflineBolt
      sx={{ mr: 1 }}/></span>

    if (status === TourStatusType.SYNCED) {
      return <>{name}</>
    }

    return isOffline()
      ? <>
        {(status === TourStatusType.UPDATED || status === TourStatusType.CREATED) && offlineBolt}
        {name}
      </>
      : <>
        {name}
        {status === TourStatusType.CREATED && offlineCreatedChip}
      </>
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 2, renderCell: getName },
    {
      field: 'createdAt',
      headerName: 'Created at',
      type: 'dateTime',
      valueFormatter: (params: GridValueFormatterParams) => {
        return formatDate(params.value)
      },
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'Updated at',
      type: 'dateTime',
      valueFormatter: (params: GridValueFormatterParams) => {
        return formatDate(params.value)
      },
      flex: 1
    }
  ]

  return <List
    loading={loading}
    rows={rows}
    columns={columns}
    canView
    canEdit
    canDelete
  />
}
export default TourList
