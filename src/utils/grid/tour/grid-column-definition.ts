import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import tourCategoriesFilterOperators from './grid-filters/tour-categories-filter-operators'
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
      minWidth: 180,
      renderCell: getCategoriesFn,
      valueGetter: getCategoryValuesFn,
      type: 'singleSelect',
      sortable: false,
      filterable: !isOfflineFn(),
      filterOperators: tourCategoriesFilterOperators()
    }
  ]
}
