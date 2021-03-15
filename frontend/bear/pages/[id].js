import { useRouter } from 'next/router'
import { useEffect, useState} from 'react'
import axios from 'axios'

const URL = `http://localhost/api/bears`

const Bear = () => {
    const [bear, setBear] =useState({})
    const route = useRouter()
    const { id } = route.query

    const getBear = async () =>{
        let bear =  await axios.get(`${URL}/${id}`)
        setBear( {name: bear.data.name, weight: bear.data.weight} )
      }

      useEffect( () => {
        getBear()
    
      })

return <p>Bear: {id} {bear.name} {bear.weight} </p>

}

export default Bear