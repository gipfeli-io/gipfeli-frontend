import React from 'react'
import { TourCategory, UpdateTourCategory } from '../../../types/tour-category'
import { FormType } from '../../../enums/form-type'
import { Chip } from '@mui/material'
import { ReactSVG } from 'react-svg'

type TourCategoryIconListProps = {
  categories: TourCategory[],
  formType?: FormType,
}

type TourCategoryIconChipProps = {
  category: UpdateTourCategory,
  clickHandler?: (category: UpdateTourCategory) => void
}

const iconFolder = `${process.env.PUBLIC_URL}/assets/icons`

export const TourCategoryIconChip = ({ category, clickHandler }: TourCategoryIconChipProps): JSX.Element => {
  if (clickHandler) {
    return <Chip
                 icon={<ReactSVG src={`${iconFolder}/${category.iconName}`} className="category-list_icon" wrapper="span"/>}
                 sx={{ width: 1 }} label={category.name} color={category.isSelected ? 'primary' : 'default'} onClick={() => clickHandler(category)}/>
  } else {
    return <Chip icon={<ReactSVG src={`${iconFolder}/${category.iconName}`} className="category-list_icon" wrapper="span"/>}
                   sx={{ width: 1 }} label={category.name} color='primary'/>
  }
}

export const TourCategoryIconList = ({ categories }: TourCategoryIconListProps): JSX.Element => {
  return (
    <>
      {categories.map((category, index) => (
        <span key={index}>
          <ReactSVG src={`${iconFolder}/${category.iconName}`} className="category-list_icon"/>
        </span>
      ))}
    </>
  )
}
