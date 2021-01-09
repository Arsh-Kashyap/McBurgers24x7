import axios from 'axios';
const instance = axios.create({
    baseURL: "https://mcburgers24x7.firebaseio.com/", 
});
export default instance;