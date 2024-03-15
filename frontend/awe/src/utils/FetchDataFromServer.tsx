import axios from 'axios';
import { Dispatch, SetStateAction } from "react";
import GetCurrTime from './GetCurrTime';

const prefix = 'http://localhost:8000';

async function FetchDataFromServer(url: string, setFunc: Dispatch<SetStateAction<any>>) {
  console.log(GetCurrTime());  // TODO rm in prod
  return await axios.get(prefix + url)
    .then((response) => {setFunc(response.data)})
    .catch((error) => {console.log(error)})
}

export default FetchDataFromServer