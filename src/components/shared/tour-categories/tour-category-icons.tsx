import React from 'react'
import { TourCategory, UpdateTourCategory } from '../../../types/tour-category'
import { FormType } from '../../../enums/form-type'
import { Avatar, Chip } from '@mui/material'

type TourCategoryIconListProps = {
  categories: TourCategory[],
  formType?: FormType,
}

type TourCategoryIconChipProps = {
  category: UpdateTourCategory,
  handleClick?: (category: UpdateTourCategory) => void
}

const iconFolder = '/assets/icons/'

export const TourCategoryIconChip = ({ category, handleClick }: TourCategoryIconChipProps): JSX.Element => {
  if (handleClick) {
    return <Chip
                 avatar={<Avatar alt={category.name} src={`${iconFolder}${category.iconName}`}/>}
                 sx={{
                 }} label={category.name} color='primary' onClick={() => handleClick(category)}/>
  } else {
    return <Chip avatar={<Avatar alt={category.name} src={`${iconFolder}${category.iconName}`}/>}
                   sx={{ width: 1 }} label={category.name} color='primary'/>
  }
}

export const TourCategoryIconList = ({ categories }: TourCategoryIconListProps): JSX.Element => {
  return (
    <>
      {categories.map((category, index) => (
        <span key={index}>
          {category.name}
        </span>
      ))}
    </>
  )
}
