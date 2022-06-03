import { Link as MuiLink } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useContext } from 'react'
import TourListContext from './TourListContext'
import { Link } from 'react-router-dom'

export default function TourListActions (props: { id: string }): JSX.Element {
  const { id } = props
  const tourListContext = useContext(TourListContext)

  const onClick = () => {
    tourListContext.deleteEvent(id)
  }

  return (
    <>
      <MuiLink component={Link} to={props.id}><VisibilityIcon/></MuiLink>
      <MuiLink component={Link} to={`${props.id}/edit`}><EditIcon/></MuiLink>
      <MuiLink href="#" onClick={onClick}><DeleteIcon/></MuiLink>
    </>
  )
}
