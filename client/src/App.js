import React ,{ useEffect, useState } from "react";

const App = ()=> {
  const [reagent, setReagent] = useState("")
  const [rgtLot, setRgtLot]= useState("")
  const [expDate, setExpDate] = useState("")
  const [rgtQuant, setRgtQuant] = useState("")
  // const [minAmount, setMinAmount] = useState("")


  const addReagent = ()=>{
    const option={
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name : reagent,
        lot_number : rgtLot,
        exp_date : expDate,
        quantity : rgtQuant,
        // min_amount : minAmount
      })
    }
    fetch("http://localhost:5050/api/reagent", option)
     .then((resp)=>{
      return resp.json()
     })
     .then((data)=>{ console.log(data, "MY DATA");
        setReagent("");
        setRgtLot("");
        setExpDate("");
        setRgtQuant("");
        // setMinAmount("");
     })
  }

  return (
    <div className="text-center mt-5">

    <form>
      <label><strong>Reagent</strong></label>
      <input className ="me-2" onChange={(e)=>setReagent(e.target.value)} value={reagent} type="text"/>
      <label><strong>Lot NUmber</strong></label>
      <input className ="me-2" onChange={(e)=>setRgtLot(e.target.value)} value={rgtLot} type="text"/>
      <label><strong>Exp Date</strong></label>
      <input className ="me-2"  onChange={(e)=>setExpDate(e.target.value)} value={expDate} type="text"/>
      <label><strong>Quantity</strong></label>
      <input onChange={(e)=>setRgtQuant(e.target.value)} value={rgtQuant} type ="text"/>
      <button className="btn btn-primary" onClick={addReagent}>Submit</button>
    </form>
      
    </div>
  )
}

export default App;
