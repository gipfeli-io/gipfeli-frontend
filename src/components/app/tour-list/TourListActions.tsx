import Link from 'next/link'
import {Link as MuiLink} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import {useContext} from 'react'
import TourListContext from './TourListContext'

export default function TourListActions(props: { id: string }): JSX.Element {
    const {id} = props
    const tourListContext = useContext(TourListContext)

    const onClick = () => {
        tourListContext.deleteEvent(id)
    }

    return (
        <>
            <Link href={`tours/${props.id}`} passHref>
                <MuiLink><VisibilityIcon/></MuiLink>
            </Link>
            <Link href={`tours/${props.id}/edit`} passHref>
                <MuiLink><EditIcon/></MuiLink>
            </Link>
            <MuiLink onClick={onClick}><DeleteIcon/></MuiLink>
        </>
    )
}