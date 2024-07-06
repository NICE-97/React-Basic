import Transaction from "./components/Transaction";
import './App.css'
import FormComponent from "./components/FormComponent";
import { useState,useEffect,/*useReducer*/ } from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";

const Title = ()=> <h1 style={{color:'red',fontSize:'1.5rem',textAlign:"center"}}>โปรแกรมบัญชีราย รับ-รายจ่าย</h1>
function App() {

  // const initState = [
  //   {id:1,title:"ค่าเช่าบ้าน",amount:-2000},
  //   {id:2,title:"เงินเดือน",amount:30000},
  //   {id:3,title:"ค่าขนม",amount:-700},
  //   {id:4,title:"ค่าน้ำ-ค่าไฟ",amount:-1550},
  //   {id:5,title:"ขายของ",amount:2250}
  // ]

  const [items,setItem] = useState([]);
  const [reportIncome,setReportIncome] = useState(0);
  const [reportExpense,setReportExpense] = useState(0);
  const onAddNewItem = (newItem)=>{
    setItem((prevItem)=>{
      return [newItem,...prevItem]
    })
  }
  useEffect(()=>{
    const amounts = items.map(items=>items.amount)
    const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0)
    const expense = amounts.filter(element=>element<0).reduce((total,element)=>total-=element,0)
    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))
  },[items,reportIncome,reportExpense])
  //reducer state
  // const [showReport,setshowReport] = useState(true);
  // const reducer = (state,action)=>{
  //   switch(action.type){
  //     case "SHOW":
  //       return setshowReport(true);
  //     case "HIDE":
  //       return setshowReport(false);
  //   }
  // }
  // const [result,dispatch] = useReducer(reducer,showReport)
  return (
    <DataContext.Provider value={{income : reportIncome,expense: reportExpense}}>
      <div className="container">
      <Title/>
      {/* {showReport && <ReportComponent/>} */}
      <Router>
        <div>
          <ul className="horizontal-menu">
            <li>
              <Link to="/">ข้อมูลบัญชี</Link>
            </li>
            <li>
              <Link to="/insert">บันทึกข้อมูล</Link>
            </li>
          </ul>
          <Routes>
              <Route path="/" element={<ReportComponent />} />
              <Route path="/insert" element={
                  <>
                    <FormComponent onAddItem={onAddNewItem} />
                    <Transaction items={items} />
                  </>
                }
              />
            </Routes>
        </div>
      </Router>
      {/* <h1>{result}</h1> */}
      {/* <button onClick={()=>dispatch({type:"SHOW"})}>แสดง</button>
      <button onClick={()=>dispatch({type:"HIDE"})}>ซ่อน</button> */}
      </div>
    </DataContext.Provider>
  );
}

export default App;
