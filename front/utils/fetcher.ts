import axios from 'axios';

const fetcher = (url:string) => {
  axios.get(url, {withCredentials: true})
  .then((res) => res.data)
  .catch((err) => 
    err.data
  ,);
}

export default fetcher;