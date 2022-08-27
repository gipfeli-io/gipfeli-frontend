import { GridColDef, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid'
import tourCategoriesFilterOperators from './grid-filters/tour-categories-filter-operators'
import { formatDate } from '../../date-conversion-helper'
import { Tour } from '../../../types/tour'

export const getGridColumnDefinition = (isOfflineFn: () => boolean,
  getNameFn: (params: GridValueGetterParams<Tour, Tour>) => JSX.Element,
  getCategoriesFn: (params: GridValueGetterParams<Tour, Tour>) => JSX.Element,
  getCategoryValuesFn: (params: GridValueGetterParams<Tour, Tour>) => string[]): GridColDef[] => {
  return [
    {
      field: 'name',
      headerName: 'Name',
      flex: 2,
      minWidth: 200,
      renderCell: getNameFn
    },
    {
      field: 'categories',
      headerName: 'Categories',
      flex: 2,
      renderCell: getCategoriesFn,
      valueGetter: getCategoryValuesFn,
      type: 'singleSelect',
      sortable: false,
      filterable: !isOfflineFn(),
      filterOperators: tourCategoriesFilterOperators()
    },
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
}
