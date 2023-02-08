import { useState } from 'react';
import './App.css';
import { Chart } from "react-google-charts";
function App() {
const [age,setAge]= useState(0);
const [weight,setWeight]= useState(0);
const [data,setData]= useState([["Age" , "Weight"],[4, 5.5], [8, 12]])

const Chartdata=()=>{
let data1 = [["Age", "Weight"],[age, weight]]
console.log(data1)
setData(data1)}; 


return (
    <div className="App">
     <Chart
  chartType="ScatterChart"
  data={data}
  width="100%"
  height="400px"
  legendToggle
/>
<div className='inputDataField'>
<input value={age} onChange={(e)=>setAge(Number(e.target.value))} placeholder="Type age here" className='inputage'/>
<input value={weight}  onChange={(e)=>setWeight(Number(e.target.value))} placeholder="Type Weight here" className='inputWeight'/>
<button onClick={Chartdata} className='submitbutton'>SUBMIT</button>
</div>
    </div>
  );
}

export default App;
