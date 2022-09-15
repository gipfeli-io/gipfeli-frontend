import React, { useEffect, useState } from 'react'
import { TourCategory, UpdateTourCategory } from '../../types/tour-category'
import { Alert, AlertTitle, Grid } from '@mui/material'
import LookupService from '../../services/lookup/lookup-service'
import useErrorHandling from '../../hooks/use-error-handling'
import useApiError from '../../hooks/use-api-error'
import useAuth from '../../hooks/use-auth'
import { FormType } from '../../enums/form-type'
import TourCategoryIconChip from '../shared/tour-categories/TourCategoryIconChip'

type CategoryListProps = {
  tourCategories: TourCategory[],
  handleSetCategories?: (categories: TourCategory[]) => void,
  type: FormType,
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
      const newCategories = categories.filter((newCategory) => newCategory.isSelected)
        .map((newCategory) => new TourCategory(newCategory.id, newCategory.name, newCategory.iconName))
      handleSetCategories(newCategories)
    }
  }

  const mapCategoriesOnTourToList = (categoryList: UpdateTourCategory[]): UpdateTourCategory[] => {
    categoryList.forEach((category: UpdateTourCategory) => {
      category.isSelected = !!tourCategories.find((cat) => cat.id === category.id)
    })

    // only show selected categories when in detail view
    if (type === FormType.DETAIL) {
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
          const mappedCategories = mapCategoriesOnTourToList(result.content! as UpdateTourCategory[])
          setCategories(mappedCategories)
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
    console.log('is 0')
    return (<></>)
  }

  const getDetailView = () => (
    <>
      {
        categories.map((item, index) => (
          <Grid item xs={6} md={2} key={index}>
            <TourCategoryIconChip category={item}/>
          </Grid>
        ))
      }
    </>
  )

  const getEditView = () => (
    <>
      {hasError &&
        <Grid item xs={12}>
          <Alert severity={'error'} sx={{ mb: 2 }}>
            <AlertTitle> Please select at least one category!</AlertTitle>
          </Alert>
        </Grid>
      }
      { categories.map((item, index) => (
        <Grid item xs={6} md={2} key={index}>
          <TourCategoryIconChip category={item} clickHandler={handleClick}/>
        </Grid>
      ))
      }
    </>
  )

  return (
    <>
      <Grid container spacing={1} direction={'row'} alignItems={'center'}>
        {type === FormType.DETAIL ? getDetailView() : getEditView()}
      </Grid>
    </>
  )
}

export default TourCategoryList
