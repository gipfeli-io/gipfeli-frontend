import {Tour} from '../../types/tour'
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid'
import TourListActions from './TourListActions'
import ToursService from '../../services/tours/tours-service'
import useSWR from 'swr'
import {plainToInstance} from 'class-transformer'

function getActions(params: GridValueGetterParams<Tour, Tour>): JSX.Element {
    return <TourListActions id={params.row.id} />
}

const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name', flex: 2,},
    {field: 'createdAt', headerName: 'Created at', type: 'dateTime', flex: 1,},
    {field: 'updatedAt', headerName: 'Updated at', type: 'dateTime', flex: 1,},
    {field: 'actions', headerName: 'Actions', flex: 0.5, renderCell: getActions}
]

export default function TourList(): JSX.Element {
    const service = new ToursService({})
    const { data, error } = useSWR('/api/user/123', service.mockAll)
    //tours = plainToInstance(Tour, tours) // todo: maybe have this in a generic fashion?

    return <div style={{width: '100%'}}>
        <DataGrid
            autoHeight
            disableColumnSelector
            disableSelectionOnClick
            rows={data ?? []}
            columns={columns}/>
    </div>
}