import { GridColDef } from '@mui/x-data-grid'
import React from 'react'
import "./add.scss"
import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';



type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const Add = (props: Props) => {
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`https://dashdord.vercel.app/api/${props.slug}s`, {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 23,
          img: "",
          lastName: "Hubbardaa",
          firstName: "Eulaaa",
          email: "hubbaraad@gmail.com",
          phone: "42369 452 729",
          createdAt: "07.07.2023",
          verified: true,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(`all${String(props.slug)}s` as InvalidateQueryFilters);

    }
  })
  

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate()
    props.setOpen(false)
  }

  return (
    <div className='add'>
      <div className="modal">
        <span className="close" onClick={()=> props.setOpen(false)}>X</span>
        <h1>Add new {props.slug }</h1>
        <form onSubmit={handleSubmit}>
  {props.columns.filter(item => item.field !== "id" && item.field !== "img").map((column) => (
    <div className="item" key={column.field}>
      <label>{column.headerName}</label>
      <input type={column.type} placeholder={column.field} />
    </div>
  ))}
  <button>Send</button>
</form>
      </div>
    </div>
  )
}

export default Add
