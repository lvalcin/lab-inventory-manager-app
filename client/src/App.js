import React ,{ useEffect, useState } from "react";

const App = ()=> {
  const [reagent, setReagent] = useState("")
  const [rgtLot, setRgtLot]= useState("")
  const [expDate, setExpDate] = useState("")
  const [rgtQuant, setRgtQuant] = useState("")
  const [reagentList, setReagentList] = useState([])
  // const [minAmount, setMinAmount] = useState("")

  const fetchReagentList = ()=>{
    fetch("http://localhost:5050/api/reagent")
      .then((resp)=>resp.json())
      .then((data)=>{setReagentList(data)})
  }

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

 const deleteReagent = (id)=>{
  const option ={
    method: "DELETE",
    headers:{
      "Content-Type": "application/json"
    },
  }
  fetch(`http://localhost:5050/api/reagent/${id}`, option)
    .then((resp)=>console.log("DELETED", resp))
    .then(()=>fetchReagentList())
 }

useEffect(()=>{
  fetchReagentList();
},[])
  return (
    <div className="text-center mt-5">

    <form>
      <label><strong>Reagent</strong></label>
      <input className ="me-2" onChange={(e)=>setReagent(e.target.value)} value={reagent} type="text"/>
      <label><strong>Lot Number</strong></label>
      <input className ="me-2" onChange={(e)=>setRgtLot(e.target.value)} value={rgtLot} type="text"/>
      <label><strong>Exp Date</strong></label>
      <input className ="me-2"  onChange={(e)=>setExpDate(e.target.value)} value={expDate} type="text"/>
      <label><strong>Quantity</strong></label>
      <input onChange={(e)=>setRgtQuant(e.target.value)} value={rgtQuant} type ="text"/>
      <button className="btn btn-primary" onClick={addReagent}>Submit</button>
    </form>
    <div>
      <h2>REAGENT INVENTORY</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Reagent</th>
            <th>Lot Number</th>
            <th>Exp Date</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {reagentList.map((item,index)=>(
            <tr key={index}>
            <td>{item.name}</td>
            <td>{item.lot_number}</td>
            <td>{item.exp_date}</td>
            <td>{item.quantity}</td>
            <td><button className= "btn btn-danger mt-2"
                    onClick={
                    ()=> deleteReagent(item.id)}>
                    DELETE
                 </button>
            </td>
            </tr>
          )   
          )}
        </tbody>
        </table>
      
    </div>
      
    </div>
  )
}

export default App;
