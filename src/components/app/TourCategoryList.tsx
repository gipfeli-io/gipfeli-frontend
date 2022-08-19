import React from 'react'
import { TourCategory } from '../../types/tour-category'
import { Chip } from '@mui/material'

type CategoryListProps = {
  categories: TourCategory[],
  handleSetCategories?: (categories: TourCategory[]) => void,
  type: string // todo: create enum => also use for tour
}

const TourCategoryList = ({ categories, handleSetCategories, type }: CategoryListProps) => {
  const handleClick = (category: TourCategory) => {
    if (type === 'detail') {
      return
    }
    category.isSelected = !category.isSelected
    if (handleSetCategories) {
      handleSetCategories(categories)
    }
  }

  return (
    <>
      {categories.map((item, index) => (
        <div key={index}>
          <Chip label={item.name} onClick={() => handleClick(item)}/>
        </div>
      ))
      }
    </>
  )
}

export default TourCategoryList
