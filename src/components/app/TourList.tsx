import { Tour } from '../../types/tour'
import { GridColDef, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid'
import React from 'react'
import { OfflineBolt } from '@mui/icons-material'
import { TourStatusType } from '../../enums/tour-status-type'
import useConnectionStatus from '../../hooks/use-connection-status'
import { Chip } from '@mui/material'
import { formatDate } from '../../utils/date-conversion-helper'
import List from '../shared/list/List'
import TourCategoryIconList from '../shared/tour-categories/tour-category-icon-list'

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

  // add new component that returns the correct icon for the given category
  const getCategories = (params: GridValueGetterParams<Tour, Tour>): JSX.Element => {
    const { categories } = params.row
    return (
      <TourCategoryIconList categories={categories}/>
    )
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 2, minWidth: 200, renderCell: getName },
    { field: 'categories', headerName: 'Categories', flex: 2, renderCell: getCategories, sortable: false, filterable: false },
    {
      field: 'createdAt',
      headerName: 'Created at',
      type: 'dateTime',
      minWidth: 100,
      valueFormatter: (params: GridValueFormatterParams) => {
        return formatDate(params.value)
      },
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'Updated at',
      type: 'dateTime',
      minWidth: 100,
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
