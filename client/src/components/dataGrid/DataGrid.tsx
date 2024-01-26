import { Link } from "react-router-dom";
import "./dataGrid.scss";
import { DataGrid, GridColDef, GridToolbar} from '@mui/x-data-grid';
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    columns: GridColDef[],
    rows: object[],
    slug: string,
    
}

const DataTable = (props: Props) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: number) => {
          return fetch(`https://dashdord.vercel.app/api/${props.slug}/${id}`, {
            method: "delete",
          });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(`all${String(props.slug)}` as InvalidateQueryFilters);

        },
      });
      
      const handleDelete = (id: number) => {
        mutation.mutate(id);
        console.log(id);
      };
      

    const actionColumn: GridColDef = {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
            return (
                <div className="action">
                    <Link to={`/${props.slug}/${params.row.id}`}>
                        <img src="/view.svg" alt="" />
                    </Link>
                    <div className="delete" onClick={() => handleDelete(params.row.id)}>
                        <img src="/delete.svg" alt="" />
                    </div>
                </div>
            );
        },
    };

    return (
        <div className="dataGrid">
            <DataGrid
                className="dataGrid"
                rows={props.rows}
                columns={[...props.columns, actionColumn]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />
        </div>
    );
};

export default DataTable;
