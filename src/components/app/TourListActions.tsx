import Link from 'next/link'
import {Link as MuiLink} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TourListActions(props: { id: string }) {
    return (
        <>
            <Link href={props.id} passHref>
                <MuiLink><VisibilityIcon/></MuiLink>
            </Link>
            <Link href="/app/edit/[id]" as={`/app/edit/${props.id}`} passHref>
                <MuiLink><EditIcon/></MuiLink>
            </Link>
            <Link href={props.id} passHref>
                <MuiLink><DeleteIcon/></MuiLink>
            </Link>
        </>
    )
}