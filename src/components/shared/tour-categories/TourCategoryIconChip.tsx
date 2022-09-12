import { UpdateTourCategory } from '../../../types/tour-category'
import { Chip } from '@mui/material'
import { ReactSVG } from 'react-svg'
import React from 'react'

type TourCategoryIconChipProps = {
  category: UpdateTourCategory,
  clickHandler?: (category: UpdateTourCategory) => void
}
export const iconFolder = `${process.env.PUBLIC_URL}/assets/icons`

const TourCategoryIconChip = ({ category, clickHandler }: TourCategoryIconChipProps): JSX.Element => {
  if (clickHandler) {
    return <Chip
      icon={<ReactSVG src={`${iconFolder}/${category.iconName}`} className="category-list_icon" wrapper="span"/>}
      sx={{ width: 1 }} label={category.name} color={category.isSelected ? 'primary' : 'default'}
      onClick={() => clickHandler(category)}/>
  } else {
    return <Chip
      icon={<ReactSVG src={`${iconFolder}/${category.iconName}`} className="category-list_icon" wrapper="span"/>}
      sx={{ width: 1 }} label={category.name} color="primary"/>
  }
}

export default TourCategoryIconChip
