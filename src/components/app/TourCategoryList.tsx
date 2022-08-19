import React, { useEffect, useState } from 'react'
import { TourCategory } from '../../types/tour-category'
import { Chip } from '@mui/material'
import LookupService from '../../services/lookup/lookup-service'
import useErrorHandling from '../../hooks/use-error-handling'
import useApiError from '../../hooks/use-api-error'
import useAuth from '../../hooks/use-auth'

type CategoryListProps = {
  tourCategories: TourCategory[],
  handleSetCategories?: (categories: TourCategory[]) => void,
  type: string // todo: create enum => also use for tour
}

const TourCategoryList = ({ tourCategories, handleSetCategories, type }: CategoryListProps) => {
  const auth = useAuth()
  const lookupService = new LookupService(auth.token)
  const { triggerError } = useErrorHandling()
  const throwError = useApiError()
  const [categories, setCategories] = useState<TourCategory[]>([])

  const handleClick = (category: TourCategory) => {
    if (type === 'detail') {
      return
    }
    category.isSelected = !category.isSelected
    if (handleSetCategories) {
      handleSetCategories(categories)
    }
  }

  const mapCategoriesOnTourToList = (categoryList: TourCategory[]) => {
    categoryList.forEach((category: TourCategory) => {
      if (tourCategories.find((cat) => cat.id === category.id)) {
        category.isSelected = true
      }
    })

    categoryList.sort((a, b) => a.name.localeCompare(b.name))

    setCategories(categoryList)
  }

  useEffect(() => {
    async function fetchTourCategories () {
      let result
      try {
        result = await lookupService.findAllTourCategories()
        if (result.success) {
          mapCategoriesOnTourToList(result.content!)
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

  return (
    <>
      {categories.map((item, index) => (
        <Chip sx={{ mr: 1 }} key={index} label={item.name} color={item.isSelected ? 'primary' : 'default'} onClick={() => handleClick(item)}/>
      ))
      }
    </>
  )
}

export default TourCategoryList
