import axios from 'axios';

//adding data to the table
export const addInvoice = async (invoice) => {
    return await axios.post("http://localhost:8080/HRC_project/add", invoice, {withCredentials: false, credentials: 'include'});
}