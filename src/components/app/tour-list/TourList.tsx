import {Tour} from '../../../types/tour'
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid'
import TourListActions from './TourListActions'

function getActions(params: GridValueGetterParams<Tour, Tour>): JSX.Element {
    return <TourListActions id={params.row.id} />
}

const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name', flex: 2,},
    {field: 'createdAt', headerName: 'Created at', type: 'dateTime', flex: 1,},
    {field: 'updatedAt', headerName: 'Updated at', type: 'dateTime', flex: 1,},
    {field: 'actions', headerName: 'Actions', flex: 0.5, renderCell: getActions}
]

export default function TourList(props: { rows: Tour[] }): JSX.Element {
    return <div style={{width: '100%'}}>
        <DataGrid
            autoHeight
            disableColumnSelector
            disableSelectionOnClick
            rows={props.rows}
            columns={columns}/>
    </div>
}