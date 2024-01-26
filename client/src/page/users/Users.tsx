
import "./users.scss"
import DataTable from '../../components/dataGrid/DataGrid'
import { GridColDef } from "@mui/x-data-grid";

import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
      field: "img", headerName: "Avatar", width: 100,
      renderCell: (params) => {
          return <img src={params.row.img || "/noavatar.png"} alt="" />
      }
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    type: "string",
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    type: "string",
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    type: "string",
  },
  {
    field: "createdAt",
    headerName: "CreatedAd",
    width: 200,
    type: "string"
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean"
  },
];

const Users = () => {

  const [open, setOpen] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: () => fetch('https://dashdord.vercel.app/api/users').then(res => res.json()),
  });
  
  


  return (
    <div className='users'>
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {isLoading ? ("Loading...") : (<DataTable slug="users" columns={columns} rows={data} />
)}
      {open && <Add slug="user" setOpen={setOpen} columns={columns} /> }
    </div>
  )
}

export default Users
