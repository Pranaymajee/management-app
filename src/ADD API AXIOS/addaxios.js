import axios from 'axios';
const url = 'http://localhost:8080/HRC_project'; //the backend root

//adding data to the table api
export const addInvoice = async (invoice) => {
    return await axios.post(`${url}/add`, invoice, {withCredentials: false, credentials: 'include'});
}