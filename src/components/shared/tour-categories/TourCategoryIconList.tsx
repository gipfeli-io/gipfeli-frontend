import React from 'react'
import { TourCategory } from '../../../types/tour-category'
import { FormType } from '../../../enums/form-type'
import { ReactSVG } from 'react-svg'
import { iconFolder } from './TourCategoryIconChip'

type TourCategoryIconListProps = {
  categories: TourCategory[],
  formType?: FormType,
}

const TourCategoryIconList = ({ categories }: TourCategoryIconListProps): JSX.Element => {
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

export default TourCategoryIconList
