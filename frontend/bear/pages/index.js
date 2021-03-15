import { useEffect, useState } from 'react'
import  axios  from 'axios'
import HomeStyle  from '../styles/Home.module.css'

const URL = `http://localhost/api/bears`


export default function Home() {

  const [bears,setBears] = useState({ 
        list: [
                {id: 1, name: 'Winnie', weight: 22},
                {id: 2, name: 'Pooh', weight: 24}
              ]
            });
  const [name, setName] = useState('')
  const [weight, setWeight] = useState(0)
  const [bear, setBear] = useState([])
  
  useEffect( () => {
    getBears()

  },[])

  //One Bear          
  const addBear = async (name, weight) => {

     let bears = await axios.post(URL, { name, weight});
     setBears(bears.data);
  }
  const getBear = async (id) =>{
    let bear =  await axios.get(`${URL}/${id}`)
    setBear( {name: bear.data.name, weight: bear.data.weight} )
  }
  //-------------------------------------------------------------------------------
  //Many Bears
  const printBears = () => {
    if( bears.list && bears.list.length)
      return bears.list.map( (item, index)=> 
        <li key={index}>
          {item.id}. 
          {item.name}: 
          {item.weight}
          <button onClick={()=>getBear(item.id)}>Get</button>
          <button onClick={ () => updateBear(item.id)}>Update</button>
          <button onClick={ ()=> deleteBear(item.id) }>Delete</button>
        </li>)
    else
      return <h1>No bear</h1>
      
  }
    //await -- async
  const getBears = async () => {
    
      let bear = await axios.get(URL);
      setBears(bear.data);
      console.log(bear);
    }

  const updateBear = async (id) => {
    let bears = await axios.put(`${URL}/${id}`, {name,weight})
    setBears(bears.data)
  }

  const deleteBear = async (id) => {
    let bears = await axios.delete(`${URL}/${id}`)
    setBears(bears.data)
  }

  return (
    <div className={HomeStyle.container}>
      Bears
      <ul>
         {printBears()}
      </ul>

      <ul>
        Selected bear:{bear.name} : {bear.weight}
      </ul>
     
      
        <h2>Add Bear</h2>
        Name: <input type="text" onChange={ (e)=> setName(e.target.value)}/> <br />
        Weight: <input type="number" onChange={ (e) => setWeight(e.target.value)}/> <br />
        <button  onClick={ () => addBear(name, weight)}>add</button>
        
      
    
    </div>
    
  )
}
