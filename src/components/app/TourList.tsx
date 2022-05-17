import {Tour} from '../../types/tour'
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid'
import TourListActions from './TourListActions'

function getActions(params: GridValueGetterParams) {
    //todo: typehint
    return <TourListActions id={params.row.id} />
}


const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name', flex: 1,},
    {field: 'createdAt', headerName: 'Created at', flex: 1,},
    {field: 'updatedAt', headerName: 'Updated at', flex: 1,},
    {field: 'actions', headerName: 'Actions', flex: 0.5, renderCell: getActions}
]

export default function TourList(props: { rows: Tour[] }) {
    return <div style={{width: '100%'}}>
        <DataGrid
            autoHeight
            disableColumnSelector
            disableSelectionOnClick
            rows={props.rows}
            columns={columns}/>
    </div>
}