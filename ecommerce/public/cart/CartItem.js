import React from "react";
import products from "../products";
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
let amount = 0
function CartItem(){ 
    const btn = {
        padding:"10px",
        margin:"5px",
        backgroundColor: "#d9230f",
        color:"white",
        borderRadius:"5px"
    }
    const [items,setItems] = useState([])
    const [message,setMessage]=useState("")
    const url = "http://localhost:3002/products"
    const cartInfo= ()=>{
        fetch(url)
        .then((response)=>response.json())
        .then((emp)=> setItems(emp))
    }
    const deleteInfo =(pid)=>{
        axios.delete("http://localhost:3002/products/"+pid)
        .then(response=>{
            setMessage("");
            cartInfo();
        })
        .catch(error=>{
               setMessage("")
        })   

    }
    useEffect(
        ()=>{
            cartInfo();
}
    ,[true]);
    return(
       <div style={{height:"100%"}}>
         <h2 style={{color:"#483434",textAlign:"center"}}>The Total Selected products:{items.length}</h2>
         <h1>{message}</h1>
         <table cellPadding={"10%"} style={{backgroundColor:"blue",color:"white" ,width:"100%", marginBottom:'100%'}}>
             <tr>
                 <th>Id</th>
                 <th>Product</th>
                 <th>Price</th>
                 <th>count</th>
                 <th>delete</th>
             </tr>
            
                 {items.map(item=>{
                     return(
                        <tr style={{backgroundColor:'green', marginTop:"5rem"}}>
                         <td>{item.id}</td>
                         <td>{item.product}</td>
                         <td>{item.price}</td>
                         <td>{item.count}</td>
                         {/* <Link to={`/${item.product}/${item.id}`}>Ed it</Link> */}
                         <button style={btn} onClick={deleteInfo.bind(this,item.id)}>delete</button>
                         </tr> 
                     )
                 })}
             
             
         </table>
             
       </div>
    );
}

export default CartItem
