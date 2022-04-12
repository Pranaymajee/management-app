import React, {useState, useRef} from 'react';
import axios from "axios";
import Table1 from '../TableData/Table1';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { addInvoice } from '../../ADD API AXIOS/addaxios';

const useStyles = makeStyles({
    searchbar:{
        height:'auto',
        backgroundColor:"white",
        borderRadius:"4px"
    },
    flex_dialog:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'space-around',
        alignItems: 'center',
    },
    textField:{
        width: '15rem',
        backgroundColor:"white",
        borderRadius: "5px",
    },
    analytics_dialog:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'space-around',
        alignItems: 'center',
        flexDirection: 'column'
    },
});


const Btn = () => {

    const classes = useStyles();

    const disableDelete = useRef();  //useRef is used for switching the opacity of the Delete Button.
    const disableEdit = useRef();  //useRef is used for switching the opacity of the Edit Button.

    const [disableDeleteBtn, setdisableDeleteBtn] = React.useState(true);
    const [disableEditBtn, setdisableEditBtn] = React.useState(true);

    function refreshPage() {
        window.location.reload(false);
    }

    // Creating button-dialog functionality.
    const [openChart,setOpenChart] = React.useState(false);
    const chartClick = () => setOpenChart(true);
    const handleCloseChart = () => setOpenChart(false);

    const [openAnalytics,setOpenAnalytics] = React.useState(false);
    const analyticsClick = () => setOpenAnalytics(true);
    const handleCloseAnalytics = () => setOpenAnalytics(false);

    const [openAdvance,setOpenAdvance] = React.useState(false);
    const advanceClick = () => setOpenAdvance(true);
    const handleCloseAdvance = () => setOpenAdvance(false);

    const [openAdd,setOpenAdd] = React.useState(false);
    const addClick = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const [openEdit,setOpenEdit] = React.useState(false);
    const editClick = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openDelete,setOpenDelete] = React.useState(false);
    const deleteClick = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    //storing row number(Serial Number) in CheckedValue which is coming from Table1.js
    const[checkedValue,setCheckedValue]=React.useState([]);
    const serialNo = (CheckedValue) => {
        if(checkedValue.includes(CheckedValue)){
            const index = checkedValue.indexOf(CheckedValue);
            checkedValue.splice(index, 1);
        }
        else{
        checkedValue.push(CheckedValue);
        }
        if(checkedValue.length == 1){
            setdisableEditBtn(false);
            disableEdit.current.style.opacity = "1";
        }
        else{
            setdisableEditBtn(true);
            disableEdit.current.style.opacity = "0.5";
        }
        if(checkedValue.length > 0){
            setdisableDeleteBtn(false);
            disableDelete.current.style.opacity = "1";
        }
        else{
            setdisableDeleteBtn(true);
            disableDelete.current.style.opacity = "0.5";
        }
    }

//------PREDICT------PREDICT------PREDICT------PREDICT------PREDICT------PREDICT------PREDICT------

    const predictClick = () => {
        fetch("http://127.0.0.1:5000/all").then((response)=>{
            console.log(response.json());
            return response.json();
        })
        .then((data)=>{
            console.log(data);
        })
    }

//------ADVANCE SEARCH------ADVANCE SEARCH------ADVANCE SEARCH------ADVANCE SEARCH------ADVANCE SEARCH------ADVANCE SEARCH------ADVANCE SEARCH------

    const [docId, setDocId] = useState("");
    const [invoiceId, setInvoiceId] = useState("");
    const [custNum, setCustNum] = useState("");
    const [businessYr, setBusinessYr] = useState("");

    const handleDocId = (event) => setDocId(event.targer.value);
    const handleInvoiceId = (event) => setInvoiceId(event.targer.value);
    const handleCustNumber = (event) => setCustNum(event.targer.value);
    const handleBusinessYr = (event) => setBusinessYr(event.targer.value);
    
    const handleAdvance = (event) => {
        // fetch("http://localhost:8080/HRC_project/advance?"+"cust_number="+event.target.value).then((response)=>{
        //     return response.json();
        // })
        // .then((data)=>{
        //     setAdvanceData(data.invoice);
        //     console.log(advanceData);
        // })
        // setOpenAdvance(false);
    }

//------ANALYTICS VIEW------ANALYTICS VIEW------ANALYTICS VIEW------ANALYTICS VIEW------ANALYTICS VIEW------ANALYTICS VIEW------ANALYTICS VIEW------

    const [analyticsCD1,setAnalyticsCD1] = useState("");
    const [analyticsCD2,setAnalyticsCD2] = useState("");
    const [analyticsDD1,setAnalyticsDD1] = useState("");
    const [analyticsDD2,setAnalyticsDD2] = useState("");
    const [analyticsBSD1,setAnalyticsBSD1] = useState("");
    const [analyticsBSD2,setAnalyticsBSD2] = useState("");
    const [analyticsIC1,setAnalyticsIC1] = useState("");
    const [analyticsIC2,setAnalyticsIC2] = useState("");
{/* <Chart value1={analyticsCD1}/> */}
    const analyticsClearDate1 = (event) => setAnalyticsCD1(event.target.value);
    const analyticsClearDate2 = (event) => setAnalyticsCD2(event.target.value);
    const analyticsDueDate1 = (event) => setAnalyticsDD1(event.target.value);
    const analyticsDueDate2 = (event) => setAnalyticsDD2(event.target.value);
    const analyticsBaseCreateDate1 = (event) => setAnalyticsBSD1(event.target.value);
    const analyticsBaseCreateDate2 = (event) => setAnalyticsBSD2(event.target.value);
    const analyticsInvoiceCur1 = (event) => setAnalyticsIC1(event.target.value);
    const analyticsInvoiceCur2 = (event) => setAnalyticsIC2(event.target.value);

    const handleAnalytics = () => {
        chartClick();
        setOpenAnalytics(false);
    }

//------SEARCH------SEARCH------SEARCH------SEARCH------SEARCH------SEARCH------SEARCH------SEARCH------SEARCH------SEARCH------SEARCH------SEARCH------
    
    const [searchData, setSearchData] = useState([]);
    const handleSearch = (event) => {
        fetch("http://localhost:8080/HRC_project/search?"+"cust_number="+event.target.value).then((response)=>{
            return response.json();
        })
        .then((data)=>{
            setSearchData(data.invoice);
            console.log(searchData);
        })
    }

//------ADD------ADD------ADD------ADD------ADD------ADD------ADD------ADD------ADD------ADD------ADD------ADD------

    // Setting the values given by the user using useState.
    const initialValue = {
        business_code: '',
        cust_number: '',
        clear_date: '',
        buisness_year: '',
        doc_id: '',
        posting_date: '',
        document_create_date: '',
        due_in_date: '',
        invoice_currency: '',
        document_type: '',
        posting_id: '',
        total_open_amount: '',
        baseline_create_date: '',
        cust_payment_terms: '',
        invoice_id: ''
    }
    const [invoice, setInvoice] = useState(initialValue);
    const onValueChange = (e) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value })
    }
    const handleAdd = async () => {
        await addInvoice(invoice);
        setOpenAdd(false);
        refreshPage();
    }

//------EDIT------EDIT------EDIT------EDIT------EDIT------EDIT------EDIT------EDIT------EDIT------EDIT------EDIT------EDIT------

    // Setting the value given by the user in currency and custPayment using useState.
    const [currency, setcurrency] = React.useState("");
    const [custPayment, setcustPayment] = React.useState("");
    const handleCurrency = (event) => setcurrency(event.target.value);
    const handleCust = (event) => setcustPayment(event.target.value);

    // Passing the serial number, invoice currency and cust payment terms as parameters to the backend via axois.get
    const handleEdit = () => {
        const getData = async() => {
            await axios.get("http://localhost:8080/HRC_project/edit",{params:{si_no:checkedValue[0],invoice_currency:currency,cust_pay_term:custPayment}},);
        };
        getData();
        setOpenEdit(false);
        refreshPage();
    }

//------DELETE------DELETE------DELETE------DELETE------DELETE------DELETE------DELETE------DELETE------DELETE------DELETE------DELETE------DELETE------

    // Passing the serial number as parameters to the backend via axois.get
    const handleDelete = () => {
        const strDelete = checkedValue.toString();
        console.log(strDelete);
        const deleteData = async() => {
            await axios.get("http://localhost:8080/HRC_project/delete",{params:{si_no:strDelete}},);
        };
        deleteData();
        setOpenDelete(false);
        refreshPage();
    }


    return ( 
        <div>

            {/*--------------------------------------------------Buttons--------------------------------------------------*/}

            <Grid container sx={{bgcolor: '#283D4A'}} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={12} lg={4.5}>
                    <Box sx={{mx: 'auto', width: 1, pr: 3, pl: 3, pb: 3, pt: 3, m: 0, textAlign: 'center'}}>
                        <ButtonGroup fullWidth variant="contained" size="large" aria-label="large button group">
                        <Button onClick={predictClick} sx={{fontSize:'0.8rem'}}>PREDICT</Button>
                        <Button onClick={analyticsClick} sx={{fontSize:'0.8rem'}} variant="outlined">ANALYTICS VIEW</Button>
                        <Button onClick={advanceClick} sx={{fontSize:'0.8rem'}} variant="outlined">ADVANCE SEARCH</Button>
                        </ButtonGroup>
                    </Box>
                </Grid>
                <Grid item xs={12} md={12} lg={3} alignItems="center" justifyContent="center">
                    <Box sx={{mx:'auto', width:1, pr:5, pl:5, pb:3, pt:3, m:0, textAlign:'center', display:'flex'}}>
                        <TextField
                        className={classes.searchbar}
                        fullWidth size="small"
                        id="outlined-basic"
                        onChange={handleSearch}
                        placeholder="Search Customer ID"
                        color="primary"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={12} lg={4.5} alignItems="center" justifyContent="center">
                    <Box sx={{mx: 'auto', width: 1, pr: 5, pl: 5, pb: 3, pt: 3, m: 0, textAlign: 'center'}}>
                        <ButtonGroup fullWidth variant="contained" size="large"  spacing={2}>
                        <Button onClick={addClick} sx={{fontSize:'0.8rem'}} variant="outlined" style={{color:"white"}}>ADD</Button>
                        <Button onClick={editClick} sx={{fontSize:'0.8rem'}} disabled={disableEditBtn} ref={disableEdit} variant="text" style={{color:"white", opacity: "0.5"}}>EDIT</Button>
                        <Button onClick={deleteClick} sx={{fontSize:'0.8rem'}} disabled={disableDeleteBtn} ref={disableDelete} variant="outlined" style={{color:"white", opacity: "0.5"}}>DELETE</Button>
                        </ButtonGroup>
                    </Box>    
                </Grid>
            </Grid>

            {/*--------------------------------------------------Dialog Box for ANALYTICS VIEW--------------------------------------------------*/}

            <Dialog open={openAnalytics} onClose={handleCloseAnalytics}>
                <DialogTitle sx={{bgcolor: '#283D4A', color: "white"}}>ANALYTICS VIEW</DialogTitle>
                <DialogContent sx={{bgcolor: '#283D4A'}}>
                    <Box className={classes.flex_dialog}>
                        <Box style={{display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
                            <Typography sx={{color:'white'}}>Clear Date</Typography>
                            <TextField onChange={analyticsClearDate1} sx={{mt: 0.5, mb:2}} className={classes.textField} id="clear_date" type="date" variant="filled" focused />
                            <TextField onChange={analyticsClearDate2} sx={{mb:5}} className={classes.textField} id="clear_date" type="date" variant="filled" focused />
                        </Box>
                        <Box style={{display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
                            <Typography sx={{color:'white'}}>Due Date</Typography>
                            <TextField onChange={analyticsDueDate1} sx={{mt: 0.5, mb:2}} className={classes.textField} id="due_in_date" type="date" variant="filled" focused />
                            <TextField onChange={analyticsDueDate2} sx={{mb:5}} className={classes.textField} id="due_in_date" type="date" variant="filled" focused />
                        </Box>
                        <Box style={{display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
                            <Typography sx={{color:'white'}}>Baseline Create Date</Typography>
                            <TextField onChange={analyticsBaseCreateDate1} sx={{mt: 0.5, mb:2}} className={classes.textField} id="baseline_create_date" type="date" variant="filled" focused />
                            <TextField onChange={analyticsBaseCreateDate2} sx={{mb:2}} className={classes.textField} id="baseline_create_date" type="date" variant="filled" focused />
                        </Box>
                        <Box style={{display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
                            <Typography sx={{color:'white'}}>Invoice Currency</Typography>
                            <TextField onChange={analyticsInvoiceCur1} sx={{mt: 0.5, mb:2}} className={classes.textField} id="invoice_currency" variant="filled" focused />
                            <TextField onChange={analyticsInvoiceCur2} sx={{mt: 0.5, mb:2}} className={classes.textField} id="invoice_currency" variant="filled" focused />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{pb:3, bgcolor: '#283D4A'}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button fullWidth onClick={handleAnalytics} variant='contained'>Submit</Button>
                &nbsp;&nbsp;&nbsp;
                <Button fullWidth onClick={handleCloseAnalytics} variant='contained'>Cancel</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </DialogActions>
            </Dialog>

            {/*--------------------------------------------------Dialog Box for CHART--------------------------------------------------*/}

            <Dialog fullScreen open={openChart} onClose={handleCloseChart}>
                <DialogTitle sx={{bgcolor: '#283D4A', color: 'white'}}>ANALYTICS VIEW</DialogTitle>
                <DialogContent sx={{bgcolor: '#283D4A'}}>
                
                </DialogContent>
                <DialogActions sx={{pb:3, bgcolor: '#283D4A'}}>
                <Button onClick={handleCloseChart} variant='contained'>Cancel</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </DialogActions>
            </Dialog>

            {/*--------------------------------------------------Dialog Box for ADVANCE SEARCH--------------------------------------------------*/}

            <Dialog open={openAdvance} onClose={handleCloseAdvance}>
                <DialogTitle sx={{bgcolor: '#283D4A', color: "white"}}>ADVANCE SEARCH</DialogTitle>
                <DialogContent sx={{bgcolor: '#283D4A'}}>
                    <Box className={classes.flex_dialog}>
                        <TextField onChange={handleDocId} sx={{mt:2,mb:2}} className={classes.textField} id="doc_id" label="Document id" variant="filled" focused />
                        <TextField onChange={handleInvoiceId} sx={{mt:2,mb:2}} className={classes.textField} id="invoice_id" label="Invoice id" variant="filled" focused />
                        <TextField onChange={handleCustNumber} sx={{mt:2,mb:2}} className={classes.textField} id="cust_number" label="Customer Number" variant="filled" focused />
                        <TextField onChange={handleBusinessYr} sx={{mt:2,mb:2}} className={classes.textField} id="buisness_year" label="Business Year" variant="filled" focused /> 
                    </Box>
                </DialogContent>
                <DialogActions sx={{pb:3, bgcolor: '#283D4A'}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button fullWidth onClick={handleAdvance} variant='contained'>Search</Button>
                &nbsp;&nbsp;&nbsp;
                <Button fullWidth onClick={handleCloseAdvance} variant='contained'>Cancel</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </DialogActions>
            </Dialog>

            {/*--------------------------------------------------Dialog Box for ADD--------------------------------------------------*/}

            <Dialog maxWidth="md" open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle sx={{bgcolor: '#283D4A', color: "white"}}>ADD</DialogTitle>
                <DialogContent sx={{bgcolor: '#283D4A'}}>
                    <Box className={classes.flex_dialog}>
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="business_code" id="business_code" label="Business Code" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="cust_number" id="cust_number" label="Customer Number" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="clear_date" id="clear_date" label="Clear Date" type="date" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="buisness_year" id="buisness_year" label="Business Year" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="doc_id" id="doc_id" label="Document id" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="posting_date" id="posting_date" label="Posting Date" type="date" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="document_create_date" id="document_create_date" label="Document Create Date" type="date" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="due_in_date" id="due_in_date" label="Due Date" type="date" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="invoice_currency" id="invoice_currency" label="Invoice Currency" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="document_type" id="document_type" label="Document type" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="posting_id" id="posting_id" label="Posting id" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="total_open_amount" id="total_open_amount" label="Total Open Amount" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="baseline_create_date" id="baseline_create_date" label="Baseline Create Date" type="date" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="cust_payment_terms" id="cust_payment_terms" label="Customer Payment Terms" variant="filled" focused />
                        <TextField sx={{mt:2,mb:2}} onChange={(e) => onValueChange(e)} className={classes.textField} name="invoice_id" id="invoice_id" label="Invoice id" variant="filled" focused />
                    </Box>
                </DialogContent>
                <DialogActions sx={{pb:3, bgcolor: '#283D4A'}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button fullWidth onClick={handleAdd} variant='contained'>Add</Button>
                &nbsp;&nbsp;&nbsp;
                <Button fullWidth onClick={handleCloseAdd} variant='contained'>Cancel</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </DialogActions>
            </Dialog>

            {/*--------------------------------------------------Dialog Box for EDIT--------------------------------------------------*/}

            <Dialog maxWidth="md" open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle sx={{bgcolor: '#283D4A', color: "white"}}>EDIT</DialogTitle>
                <DialogContent sx={{bgcolor: '#283D4A'}}>
                    <Box className={classes.flex_dialog}>
                        <TextField onChange={handleCurrency} sx={{mt:2,mb:2,ml:1.5,mr:1.5}} className={classes.textField} id="invoice_currency" label="Invoice Currency" variant="filled" focused />
                        <TextField onChange={handleCust} sx={{mt:2,mb:2,ml:1.5,mr:1.5}} className={classes.textField} id="cust_payment_terms" label="Customer Payment Terms" variant="filled" focused />   
                    </Box>
                </DialogContent>
                <DialogActions sx={{pb:3, bgcolor: '#283D4A'}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button fullWidth onClick={handleEdit} variant='contained'>Edit</Button>
                &nbsp;&nbsp;&nbsp;
                <Button fullWidth onClick={handleCloseEdit} variant='contained'>Cancel</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </DialogActions>
            </Dialog>

            {/*--------------------------------------------------Dialog Box for DELETE--------------------------------------------------*/}

            <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogTitle sx={{bgcolor: '#283D4A', color: 'white'}}>DELETE RECORDS?</DialogTitle>
                <DialogContent sx={{bgcolor: '#283D4A'}}>
                <DialogContentText sx={{color: 'white'}}>
                    Are you sure you want to delete these record(s)?
                </DialogContentText>
                </DialogContent>
                <DialogActions sx={{pb:3, bgcolor: '#283D4A'}}>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button fullWidth onClick={handleDelete} variant='contained'>Delete</Button>
                &nbsp;&nbsp;&nbsp;
                <Button fullWidth onClick={handleCloseDelete} variant='contained'>Cancel</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                </DialogActions>
            </Dialog>

            <Table1 searchData={searchData} onSaveEvent={serialNo}/>
        </div>
   )
}

export default Btn