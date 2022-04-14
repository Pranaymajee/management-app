import * as React from 'react';
import axios from "axios";
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';


//Getting the data from winter_internship using axios.  
const getData = async() =>
  {
    let response = await axios.get("http://localhost:8080/HRC_project/read");
    console.log(response.data);
    return response.data;
  };

  
export default function Table1(props){


  //Using an empty array and then using async function to show the data in the table.
  const [data, setData] = useState([]);
  useEffect(async() => {
    setData(await getData());
  },[]);


  //Rendering the searched value in the Table
  useEffect(() => {
    setData(props.searchData);
  },[props.searchData])


  // Creating Pagination using MUI Codebase.
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
  setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = rowsPerPage-Math.min(rowsPerPage,data.length - page*rowsPerPage);


  //Creating a function where if a checkbox is selected, it will pass the row number(Serial Number) to CheckedValue in Body.js
  const handleCheckbox = (event) => {    
    props.onSaveEvent(event.target.value); // This is recieved by the onSaveEvent function in the Table1 component in Body.js
    props.onSaveDoc(event.target.id); // This is recieved by the onSaveDoc function in the Table1 component in Body.js
  }
  

  return(
    <div>
      <TableContainer component={Paper} sx={{color: 'white', bgcolor: '#283D4A', borderRadius: "0"}}>
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell style={{border:"1px solid white"}}></TableCell>
                      <TableCell style={{color:"white", border:"1px solid white"}}>SI_NO</TableCell>
                      <TableCell align="left" style={{minWidth:"150px", color:"white", border:"1px solid white"}}>Business Code</TableCell>
                      <TableCell align="left" style={{minWidth:"150px", color:"white", border:"1px solid white"}}>Customer Number</TableCell>
                      <TableCell align="left" style={{minWidth:"150px", color:"white", border:"1px solid white"}}>Clear Date</TableCell>
                      <TableCell align="left" style={{minWidth:"150px", color:"white", border:"1px solid white"}}>Business Year</TableCell>
                      <TableCell align="left" style={{minWidth:"150px", color:"white", border:"1px solid white"}}>Document ID</TableCell>
                      <TableCell align="left" style={{minWidth:"150px", color:"white", border:"1px solid white"}}>Posting Date</TableCell>
                      <TableCell align="left" style={{minWidth:"180px", color:"white", border:"1px solid white"}}>Document create date</TableCell>
                      <TableCell align="left" style={{minWidth:"150px", color:"white", border:"1px solid white"}}>Due Date</TableCell>
                      <TableCell align="left" style={{minWidth:"150px", color:"white", border:"1px solid white"}}>Invoice Currency</TableCell>
                      <TableCell align="left" style={{minWidth:"150px", color:"white", border:"1px solid white"}}>Document Type</TableCell>
                      <TableCell align="left" style={{minWidth:"150px", color:"white", border:"1px solid white"}}>Posting ID</TableCell>
                      <TableCell align="left" style={{minWidth:"170px", color:"white", border:"1px solid white"}}>Total Open Amount</TableCell>
                      <TableCell align="left" style={{minWidth:"170px", color:"white", border:"1px solid white"}}>Baseline Create Date</TableCell>
                      <TableCell align="left" style={{minWidth:"200px", color:"white", border:"1px solid white"}}>Customer Payment Terms</TableCell>
                      <TableCell align="left" style={{minWidth:"150px", color:"white", border:"1px solid white"}}>Invoice ID</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((row) =>
                    <TableRow>
                      <TableCell><Checkbox name="Selected_row" id={row.doc_id} value={row.sl_no} onChange={handleCheckbox} style={{color:"white"}}/></TableCell>
                      <TableCell component="th" scope="row" style={{color:"white"}}>{row.sl_no}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.business_code}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.cust_number}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.clear_date}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.buisness_year}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.doc_id}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.posting_date}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.document_create_date}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.due_in_date}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.invoice_currency}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.document_type}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.posting_id}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.total_open_amount}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.baseline_create_date}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.cust_payment_terms}</TableCell>
                      <TableCell align="left" style={{color:"white"}}>{row.invoice_id}</TableCell>
                    </TableRow>
                  )}
                  {emptyRows>0&&(
                      <TableRow style={{height:53*emptyRows}}>
                          <TableCell colSpan={6}></TableCell>
                      </TableRow>
                  )}
              </TableBody>
          </Table>    
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10,25]}
        sx={{color: 'white', bgcolor: '#283D4A'}}
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}