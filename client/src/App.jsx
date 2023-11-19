import { useState,useEffect } from 'react'

import './App.css'
import{createClient} from "urql";
function App() {
const [tokens,settoken]=useState([])
  

const queryURL="https://gateway.thegraph.com/api/7f5950d866baf19883bebdbaceb1b360/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7";
const query= `{
  tokens(first: 20) {
    id 
    name
    symbol
    decimals
    lastPriceBlockNumber
    lastPriceUSD
  }}`;

const client =createClient({
      url:queryURL
    });

    useEffect(() => {
      const gettoken=async()=>{
        const {data}=await client.query(query).toPromise();
        console.log(data)
        settoken(data.tokens)
      }
      gettoken();
    
    }, [])
    

  return (
    <>
      <div>
       <h2>Token information</h2>
       
       {
       
        tokens!==null && tokens.length>0 && tokens.map((token ,num)=>{
          return(<div>
            
            <div style={{color:'red'}}> {num +1}:- {token.id}</div>
            <div style={{color:'green'}}> Token_Name:-  {token.name}</div>
            <div style={{color:'grey'}}> No_Of_Decimals :- {token.decimals}</div>
            <div style={{color:'blue'}}> Symbol :- {token.symbol}</div>
             <div style={{color:'blue'}}> lastPriceBlockNumber :- {token.lastPriceBlockNumber}</div>
          </div>)
        })
       }
      </div>
      
    </>
  )
}

export default App
