import axios from "axios"
import { Dispatch, SetStateAction } from "react";

async function FetchDataFromGitRaw
    (url: string, setFunc: Dispatch<SetStateAction<any>>) {
  return await axios.get(url)
    .then((response) => {setFunc(response.data)})
    .catch((error) => {console.log(error)})
}

export default FetchDataFromGitRaw