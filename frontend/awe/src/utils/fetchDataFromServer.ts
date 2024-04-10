'use client'

import fetchData from "@/utils/fetchData";


const prefix = 'http://localhost:8000';


function fetchDataFromSerer<T>(url: string) {
  return fetchData<T>(prefix + url)
}

export default fetchDataFromSerer