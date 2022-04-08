import React, {useEffect, useState} from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';




const columns = [
  { 
    field: 'sl_no',
    headerName: 'Sl_no',
    width:70, 
  },
  {
    field: 'business_code',
    headerName: 'Business Code',
    width: 160,
    editable: true,
  },
  {
    field: 'cust_number',
    headerName: 'Customer Number',
    width: 160,
    editable: true,
  },
  {
    field: 'clear_date',
    headerName: 'Clear Date',
    type: 'number',
    width: 160,
    editable: true,
  },
  {
    field: 'buisness_year',
    headerName: 'Buisness Year',
    width: 160,
  },
  {
    field: 'doc_id',
    headerName: 'Document ID',
    width: 160,
  },
  {
    field: 'posting_date',
    headerName: 'Posting Date',
    width: 160,
  },
  {
    field: 'document_create_date',
    headerName: 'Document Create Date',
    width: 160,
  },
  {
    field: 'due_in_date',
    headerName: 'Due Date',
    width: 160,
  },
  {
    field: 'invoice_currency',
    headerName: 'Invoice Currency',
    width: 160,
  },
  {
    field: 'document_type',
    headerName: 'Document Type',
    width: 160,
  },
  {
    field: 'posting_id',
    headerName: 'Posting ID',
    width: 160,
  },
  {
    field: 'total_open_amount',
    headerName: 'Total Open Amount',
    width: 160,
  },
  {
    field: 'baseline_create_date',
    headerName: 'Baseline Create Date',
    width: 160,
  },
  {
    field: 'cust_payment_terms',
    headerName: 'Customer Payment Terms',
    width: 160,
  },
  {
    field: 'invoice_id',
    headerName: 'Invoice ID',
    width: 160,
  },
];



const Grid = () => {

  const [tableData,setTableData] = useState([]);

    useEffect(() => {
      gridData();
        // fetch("http://localhost:8080/HRC_project/read")
        //   .then((data) => data.json())
        //   .then((data) => setTableData(data))
    }, []);

    const gridData = (e) => {
      var config = {
        method: 'get',
        url: 'http://localhost:8080/HRC_project/read',
        headers: { }
      };
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setTableData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
      <div style={{ display: "flex", height: "100%"}}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
          sx={{color: 'white', bgcolor: '#283D4A'}}
            rows={tableData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row.sl_no}
          />
        </div>
      </div>
    </div>
    </>
    
  )
}


export default Grid;