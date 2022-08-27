import {
  getGridDefaultColumnTypes,
  GridCellParams,
  GridFilterItem,
  GridFilterOperator,
  GridStateColDef
} from '@mui/x-data-grid'

const filterOperator = (operator: GridFilterOperator): GridFilterOperator => {
  const getApplyFilterFn = (
    filterItem: GridFilterItem,
    column: GridStateColDef
  ) => {
    const innerFilterFn = operator.getApplyFilterFn(filterItem, column)
    if (!innerFilterFn) {
      return innerFilterFn
    }

    return (params: GridCellParams) => {
      const cellValues = params.formattedValue as Array<string>

      if (filterItem.operatorValue === 'is') {
        return cellValues.filter(value => value === filterItem.value).length > 0
      } else if (filterItem.operatorValue === 'not') {
        return !cellValues.find(value => value === filterItem.value)
      } else if (filterItem.operatorValue === 'isAnyOf') {
        return cellValues.some(value => filterItem.value.includes(value))
      }

      return innerFilterFn(params)
    }
  }

  return {
    ...operator,
    getApplyFilterFn
  }
}

const tourCategoriesFilterOperators = () => {
  const defaultColumnTypes = getGridDefaultColumnTypes()
  const filterOperatorsForCategories = defaultColumnTypes.singleSelect.filterOperators!

  return filterOperatorsForCategories.map((operator: GridFilterOperator) => filterOperator(operator))
}

export default tourCategoriesFilterOperators
