import  { useState } from 'react'
import "./products.scss"
import DataTable from '../../components/dataGrid/DataGrid';
import Add from '../../components/add/Add';
import { useQuery } from '@tanstack/react-query';
import { GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
      field: "img", headerName: "Avatar", width: 100,
      renderCell: (params: GridValueGetterParams) => {
          return <img src={params.row.img || "/noavatar.png"} alt="" />
      }
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 250,
    type: "string",
  },
  {
    field: 'color',
    headerName: 'Color',
    width: 150,
    type: "string",
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 200,
    type: "string",
  },
  {
    field: "producer",
    headerName: "Producer",
    width: 200,
    type: "String"
  },
  {
    field: "createdAt",
    headerName: "CreatedAd",
    width: 200,
    type: "string"
  },
  {
    field: "inStock",
    headerName: "InStock",
    width: 150,
    type: "boolean"
  },

];


  



const Products = () => {
  const [open, setOpen] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ['allproducts'],
    queryFn: () => fetch('https://dashdord.vercel.app/api/products').then(res => res.json()),
  });

  console.log(data)

  return (
    <div className='products'>
      <div className="info">
        <h1>Product</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>
      </div>{isLoading ? ("Loading...") : (<DataTable slug="products" columns={columns} rows={data} />)}
      {open && <Add slug="product" setOpen={setOpen} columns={columns} /> }
    </div>
  )
}

export default Products
