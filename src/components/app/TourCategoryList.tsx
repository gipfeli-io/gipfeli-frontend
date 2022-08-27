import React, { useEffect, useState } from 'react'
import { TourCategory, UpdateTourCategory } from '../../types/tour-category'
import { Alert, AlertTitle, Chip, Grid } from '@mui/material'
import LookupService from '../../services/lookup/lookup-service'
import useErrorHandling from '../../hooks/use-error-handling'
import useApiError from '../../hooks/use-api-error'
import useAuth from '../../hooks/use-auth'
import { tourCategoryIconMap } from '../shared/tour-categories/tour-category-icon-list'

type CategoryListProps = {
  tourCategories: TourCategory[],
  handleSetCategories?: (categories: TourCategory[]) => void,
  type: string, // todo: create enum => also use for tour
  hasError?: boolean
}

const TourCategoryList = ({ tourCategories, handleSetCategories, type, hasError }: CategoryListProps) => {
  const auth = useAuth()
  const lookupService = new LookupService(auth.token)
  const { triggerError } = useErrorHandling()
  const throwError = useApiError()
  const [categories, setCategories] = useState<UpdateTourCategory[]>([])

  const handleClick = (category: UpdateTourCategory) => {
    category.isSelected = !category.isSelected
    if (handleSetCategories) {
      const newCategories = categories.filter((category) => category.isSelected)
        .map((category) => new TourCategory(category.id, category.name))
      handleSetCategories(newCategories)
    }
  }

  const mapCategoriesOnTourToList = (categoryList: UpdateTourCategory[]): UpdateTourCategory[] => {
    categoryList.forEach((category: UpdateTourCategory) => {
      category.isSelected = !!tourCategories.find((cat) => cat.id === category.id)
    })

    // only show selected categories when in detail view
    if (type === 'detail') {
      categoryList = categoryList.filter((category) => category.isSelected)
    }

    return categoryList.sort((a, b) => a.name.localeCompare(b.name))
  }

  useEffect(() => {
    async function fetchTourCategories () {
      let result
      try {
        result = await lookupService.findAllTourCategories()
        if (result.success) {
          const categories = mapCategoriesOnTourToList(result.content! as UpdateTourCategory[])
          setCategories(categories)
        } else {
          throwError(result)
        }
      } catch (error: unknown) {
        triggerError(error as Error)
      }
    }
    fetchTourCategories()
  }, [])

  if (categories.length === 0) {
    return (<></>)
  }

  const getDetailView = () => (
    <>
      {
        categories.map((item, index) => (
          <Grid item xs={6} md={2} key={index}>
            <Chip label={item.name} color='primary' sx={{ width: 1 }}/>
          </Grid>
        ))
      }
    </>
  )

  const getEditView = () => (
    <>
      {hasError &&
        <Alert severity={'error'} sx={{ mb: 2 }}>
          <AlertTitle> Please select at least one category!</AlertTitle>
        </Alert>
      }
      { categories.map((item, index) => (
        <Grid item xs={6} md={2} key={index}>
          <Chip
            icon={tourCategoryIconMap.get(item.id)}
            sx={{ width: 1 }} label={item.name} color={item.isSelected ? 'primary' : 'default'} onClick={() => handleClick(item)}/>
        </Grid>
      ))
      }
    </>
  )

  return (
    <>
      <Grid container spacing={1} direction={'row'} alignItems={'center'}>
        {type === 'detail' && getDetailView()}
        {type !== 'detail' && getEditView()}
      </Grid>
    </>
  )
}

export default TourCategoryList
