import { Link as MuiLink } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useContext } from 'react'
import ListContext from './ListContext'
import { Link } from 'react-router-dom'

export type ListActionsProps = {
  id: string;
  canView?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}
const ListActions = ({ id, canView = false, canEdit = false, canDelete = false }: ListActionsProps) => {
  const listContext = useContext(ListContext)

  const onClick = () => {
    listContext.deleteEvent(id)
  }

  return (
    <>
      {canView && <MuiLink component={Link} to={id}><VisibilityIcon/></MuiLink>}
      {canEdit && <MuiLink component={Link} to={`${id}/edit`}><EditIcon/></MuiLink>}
      {canDelete && <MuiLink href="#" onClick={onClick}><DeleteIcon/></MuiLink>}
    </>
  )
}

export default ListActions
