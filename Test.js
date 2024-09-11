import React,{useEffect, useState} from "react";
import axios from "axios";
import Papa from "papaparse";

const Test=()=>{
const [data,setData]=useState([])
const [sale,setSale]=useState(0)

useEffect(()=>{
    axios.get('/sales-data.txt')
    .then((response) => {
      Papa.parse(response.data, {
        header: true,
        skipEmptyLines: true,
        complete: ({ data }) => {
            const total = data.reduce((sum, row) => sum + parseFloat(row["Total Price"] || 0), 0);
            setSale(total);
            setData(response.data)
          }
      });
    })
    .catch((err)=>{
        console.log(err)
    })
},[])
    return(
        <div>
            <h1>Sales Data -{data.length}</h1>
            <h1>Total Sale-{sale}</h1>
        </div>
    )
}

export default Test