
import './styles/App.css';
import React, {
  useState,useRef,useEffect
} from 'react'
import {
  API_HOST
} from './config'
import axios from 'axios';
import moment from 'moment-timezone'
function App() {
  
  const [anotherSelection, setAnotherSelection] = useState('dnone')
  
  const currencyList = ['USD', 'CAD', 'CNY', 'EUR', 'GBP', 'HKD', 'JPY', 'KRW', 'THB', 'AUD', 'SGD']
  const currency_ChineseList = {
    'USD': '美元(USD)', 'HKD': '港幣(HKD)', 'GBP': '英鎊(GBP)', 'AUD': '澳幣(AUD)', 'CAD': '加拿大幣(CAD)', 'SGD':'新加坡幣(SGD)', 'JPY': '日圓(JPY)', 'THB': '泰銖(THB)'
    , 'EUR': '歐元(EUR)', 'KRW': '韓圜(KRW)', 'CNY': '人民幣(CNY)'
  }
  const [currency,setCurrency]=useState('')
  
  const [inputCurrency, setInputCurrency]=useState(0)

  const [rate,setRate] = useState(0)
  const [TWDRate,setTWDRate] = useState(0)
  const inputRef = useRef(null)
  
  const [updatedTime,setUpdatedTime] = useState('')

  const displayAnother=()=>{
     if (anotherSelection === 'dnone') {
       setAnotherSelection('dshow')
     } else {
       setAnotherSelection('dnone')
     }
  }

  const exchange = async (currency) => {
    let apiData = await axios.get(`${API_HOST}`)
    let j = apiData.data.conversion_rates;
     setRate(j[currency])   
  }

 

  useEffect(()=>{
    (async () => {
      let apiData = await axios.get(`${API_HOST}`)
      // console.log(apiData)
      let j = apiData.data.conversion_rates;
      let time = apiData.data.time_last_update_utc;
      // console.log(time.toString())
      let timeString = time.toString()
      const nowTime = moment(timeString).tz('Asia/Taipei').format("YYYY/MM/DD HH:mm")
      let TWD = j.TWD;
      setTWDRate(TWD)
      setUpdatedTime(nowTime)
    })()
  },[])
  
  return (
    <>
      <div className="container">
      <div className="d-flex col-7 mt-5 title p-0">
      
        <p className="page-header mb-0">即時匯率</p>
        <p className="updatedTime ">更新時間:{updatedTime}</p>
      </div>
      <div className="row">
        <div className="main-area col-7">
         {/* <i className="fas fa-sync-alt"></i> */}
          <div className="currency-field">
            <div className="input_div ml-2 col-5 py-3">
             <div className={currency?'TAIWAN-Flag col-3':'search_icon col-3'}><img src={currency?`./${currency}.png`:'./Search.png'} alt=""/></div>
             <p className="input1" ref={inputRef}>{currency_ChineseList[currency]? currency_ChineseList[currency]:'請選擇兌換幣別'}</p>
               <div className="arrow" onClick={()=>{displayAnother()
             }}><button><i className="fal fa-chevron-down"></i></button></div>
            
            </div>
             <div className="input_div ml-2 col-5 py-3 d-flex">
               {/* <div><i className="fal fa-search"></i></div> */}
               <div className="TAIWAN-Flag col-3"><img src="./TWD.png" alt=""/></div>
             <p  className="input1">新台幣(TWD)</p> 
              
             </div>
          </div>
          <div className="selection">
            <div className={`select-area col-5 ${anotherSelection}`}>
              <ul>
              { currencyList.map((v,key)=>{
                  return(<li key={key}
                   value = {currency}
                   onClick={(e)=>{
                  //  console.log(currency_ChineseList[v])
                     for (let i in currency_ChineseList){
                       if (e.target.innerText === currency_ChineseList[i]){
                         setCurrency(i)
                         exchange(i)
                       }
                     }
                   displayAnother()
                   }}
                   >{currency_ChineseList[v]} </li>)
                })
                
              }
            </ul>
            </div>
            <div className="col-5"></div>
          </div>
          
          <div className="currency-field plus">
              <input className="amount mt-3 ml-2 col-5 input2" type="number" placeholder="請輸入金額" disabled={currency_ChineseList[currency]===undefined? 'disabled':''} onChange={(e)=>{
                 setInputCurrency(e.target.value)
                 exchange(currency)
             }}
             />
             <input className="amount mt-3 ml-2 col-5 input2 "  disabled="disabled" value={
                 inputCurrency && rate ? (((inputCurrency / rate) * (TWDRate)).toFixed(4)) : 0
             }/>
          </div>
          <div className="line-area">
             <div className="bottomLine ml-2"></div>
             <div className="bottomLine ml-2"></div>
          </div>
        </div>
      </div>
    </div>

    
    

    </>
  );
}

export default App;
