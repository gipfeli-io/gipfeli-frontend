import React from 'react'
import HikingIcon from '@mui/icons-material/Hiking'
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing'
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing'
import TerrainIcon from '@mui/icons-material/Terrain'
import { ReactComponent as Climbing } from '../../../static/img/tour/climbing.svg'
import { ReactComponent as ClimbingWithRope } from '../../../static/img/tour/climbing-with-rope.svg'
import { ReactComponent as Other } from '../../../static/img/tour/other.svg'
import { TourCategory } from '../../../types/tour-category'

type TourCategoryIconListProps = {
  categories: TourCategory[]
}
export const tourCategoryIconMap = new Map<string, JSX.Element>([
  ['d3a76ac0-9257-49e1-9656-b27f22e8f610', <DirectionsRunIcon key={1}/>],
  ['7a6507dc-ccdb-49da-9da4-bbb59ddef639', <TerrainIcon key={2} />],
  ['4b167d23-8777-4fac-95ba-310af2bec65d', <ClimbingWithRope key={3} className='category-icon'/>],
  ['599cc425-abb7-4f37-9eff-83c42383f799', <Climbing key={4} className='category-icon' />],
  ['a529f9ef-3c11-40c0-a293-0fa091bfa330', <SnowshoeingIcon key={5}/>],
  ['a9e105c2-081e-4703-9a86-97d201e163cd', <DownhillSkiingIcon key={6}/>],
  ['d9fad132-4fcc-442e-b701-07b4bfe67d76', <DirectionsWalkIcon key={7} />],
  ['7813ea36-7f8d-47f2-9708-70366c046c80', <HikingIcon key={8} />],
  ['37471666-7fe4-4a48-b058-91bc80671894', <Other key={9} className='category-icon' />],
  ['c4c929c6-152d-49bd-8728-165ca27b4098', <DirectionsBikeIcon key={10}/>],
  ['d66e0516-d060-43e9-89f5-09e646ee2e23', <ChildFriendlyIcon key={11}/>],
  ['acc0ee55-ab78-430a-936f-f6b734a69f76', <AccessibleForwardIcon key={12}/>]
])

export const TourCategoryIconList = ({ categories }: TourCategoryIconListProps): JSX.Element => {
  const getIcon = (id: string): JSX.Element | undefined => {
    return tourCategoryIconMap.get(id)
  }

  return (
    <>
      {categories.map((category) => (
        <span key={category.id} className='category-icon category-icon_list' title={category.name}>{getIcon(category.id)}</span>
      ))}
    </>
  )
}

export default TourCategoryIconList
