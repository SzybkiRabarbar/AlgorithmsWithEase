import FetchData from "./FetchData";

const prefix = 'http://localhost:8000';

function FetchDataFromSerer<T>(url: string) {
  return FetchData<T>(prefix + url)
}

export default FetchDataFromSerer