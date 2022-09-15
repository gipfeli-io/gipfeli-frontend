import { Link as MuiLink } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'
import { Link } from 'react-router-dom'
import useDeleteEntry from '../../hooks/use-delete-entry'

export type ListActionsProps = {
  id: string;
  canView?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  prependIdForEdit?: boolean;
}

/**
 * Reusable management actions for any database entry such as tours or users. The available actions can be configured by
 * their respective flags, default-wise, no actions are added.
 * @param id
 * @param canView
 * @param canEdit
 * @param canDelete
 * @param prependIdForEdit If set to false, the edit link will only append /edit. Useful for detail views where ID is already part of the URL.
 * @constructor
 */
const EntryManagementActions = ({
  id,
  canView = false,
  canEdit = false,
  canDelete = false,
  prependIdForEdit = true
}: ListActionsProps) => {
  const { toggleModal, setDeleteId } = useDeleteEntry()
  const editLink = prependIdForEdit ? `${id}/edit` : 'edit'

  const onClick = () => {
    setDeleteId(id)
    toggleModal()
  }

  return (
    <>
      {canView && <MuiLink component={Link} to={id}><VisibilityIcon/></MuiLink>}
      {canEdit && <MuiLink component={Link} to={editLink}><EditIcon/></MuiLink>}
      {canDelete && <MuiLink href="#" onClick={onClick}><DeleteIcon/></MuiLink>}
    </>
  )
}

export default EntryManagementActions
