import { Tour } from '../../types/tour'
import {
  GridColDef,
  GridValueGetterParams
} from '@mui/x-data-grid'
import React, { useEffect, useMemo, useState } from 'react'
import { OfflineBolt } from '@mui/icons-material'
import { TourStatusType } from '../../enums/tour-status-type'
import useConnectionStatus from '../../hooks/use-connection-status'
import { Chip } from '@mui/material'
import List from '../shared/list/List'
import { TourCategory } from '../../types/tour-category'
import LookupService from '../../services/lookup/lookup-service'
import useAuth from '../../hooks/use-auth'
import useApiError from '../../hooks/use-api-error'
import useErrorHandling from '../../hooks/use-error-handling'
import TourCategoryIconList from '../shared/tour-categories/tour-category-icon-list'
import { getGridColumnDefinition } from '../../utils/grid/tour/grid-column-definition'

type TourListProps = {
  rows: Tour[],
  loading: boolean,
}

const TourList = ({ loading, rows }: TourListProps) => {
  const { isOffline } = useConnectionStatus()
  const [columns, setColumns] = useState<GridColDef[]>([])
  const [categories, setCategories] = useState<TourCategory[]>([])
  const { token } = useAuth()
  const categoryService = new LookupService(token)
  const throwError = useApiError()
  const { triggerError } = useErrorHandling()

  const getName = (params: GridValueGetterParams<Tour, Tour>): JSX.Element => {
    const { name, status } = params.row
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

  const getCategories = (params: GridValueGetterParams<Tour, Tour>): JSX.Element => {
    const { categories } = params.row
    return (
      <TourCategoryIconList categories={categories}/>
    )
  }

  const getCategoryValues = (params: GridValueGetterParams<Tour, Tour>): string[] => {
    const { categories } = params.row
    return categories.map((category: TourCategory) => category.name)
  }

  const columnDefinition: GridColDef[] = getGridColumnDefinition(isOffline, getName, getCategories, getCategoryValues)

  useMemo(() => {
    async function fetchCategories () {
      try {
        const data = await categoryService.findAllTourCategories()
        if (data.success) {
          setCategories(data.content!)
        } else {
          throwError(data)
        }
      } catch (error: unknown) {
        triggerError(error as Error)
      }
    }
    if (!isOffline()) {
      fetchCategories()
    }
  }, [])

  useEffect(() => {
    const getCategoryFilterValueOptions = (): {value: string, label: string}[] => {
      if (categories.length === 0) {
        return []
      }
      return categories.map((category: TourCategory) => ({ value: category.name, label: category.name }))
    }

    if (columns.length === 0) {
      setColumns(columnDefinition)
    } else {
      if (categories.length > 0) {
        columns.find((col: GridColDef) => col.field === 'categories')!.valueOptions = getCategoryFilterValueOptions
        setColumns(() => ([
          ...columns
        ]))
      }
    }
  }, [categories])

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
