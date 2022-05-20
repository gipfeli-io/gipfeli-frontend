import Link from 'next/link'
import {Link as MuiLink} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TourListActions(props: { id: string }): JSX.Element {
    return (
        <>
            <Link href={`tours/${props.id}`} passHref>
                <MuiLink><VisibilityIcon/></MuiLink>
            </Link>
            <Link href={`tours/${props.id}/edit`} passHref>
                <MuiLink><EditIcon/></MuiLink>
            </Link>
            <Link href={`tours/${props.id}/delete`} passHref>
                <MuiLink><DeleteIcon/></MuiLink>
            </Link>
        </>
    )
}