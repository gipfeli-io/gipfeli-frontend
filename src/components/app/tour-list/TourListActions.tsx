import { Link as MuiLink } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useContext } from 'react'
import TourListContext from './TourListContext'
import { Link } from 'react-router-dom'

type TourListActionsProps = {
  id: string
}
const TourListActions = ({ id }: TourListActionsProps): JSX.Element => {
  const tourListContext = useContext(TourListContext)

  const onClick = () => {
    tourListContext.deleteEvent(id)
  }

  return (
    <>
      <MuiLink component={Link} to={id}><VisibilityIcon/></MuiLink>
      <MuiLink component={Link} to={`${id}/edit`}><EditIcon/></MuiLink>
      <MuiLink href="#" onClick={onClick}><DeleteIcon/></MuiLink>
    </>
  )
}

export default TourListActions
