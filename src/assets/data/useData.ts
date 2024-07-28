/*import { useEffect, useState } from "react";
import apiClient from "../../../api-client";
import { AxiosRequestConfig, CanceledError } from "axios";


interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string,requestConfig?: AxiosRequestConfig , deps?: any[]) => {

    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      const controller = new AbortController()// Cancelling handlers
setLoading(true)
      apiClient
        .get<FetchResponse<T>>(endpoint, {signal: controller.signal, ...requestConfig})
        //what data we get
        //.then is called when the task completes
        .then((res) => {
          setLoading(false)
          setData(res.data.results)}) 
        //.catch is called when anything is wrong while processing our request
        .catch((err) => {
          if (err instanceof CanceledError) return;//If theres a cancel error we return thin block of code.
          //otherwise we return error message. (this is not a cancel error)
          setError(err.message)
          setLoading(false)
        }); //to catch an error
    }, deps ? [...deps] : []);

    return {data, error, isLoading};

}

export default useData*/