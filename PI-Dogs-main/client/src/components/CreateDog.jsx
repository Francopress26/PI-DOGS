import React, { useEffect } from "react";
import {useState} from 'react'
 import { useDispatch,useSelector} from "react-redux";
import { postDog,getTemperaments } from "../actions";
import {Link,useHistory } from 'react-router-dom'


export default function CreateDog(){

    const dispatch= useDispatch();
    const history=useHistory()
    const temperaments= useSelector((state)=>state.temperaments)

    const[input,setInput]=useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperaments: [],
    })

    useEffect(()=>{
        dispatch(getTemperaments())
    },[])

    
    function handleInputChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperaments:[...input.temperaments,e.target.value]
            
        })

    }
    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        dispatch(postDog(input))
        alert("Dog created")
        setInput({
            name: "",
            height: "",
            weight: "",
            life_span: "",
            temperaments: [],
        })
        history.push('/home')
    }
    return(
        <React.Fragment>
            <div>
                <Link to="/home"><button>Go back</button></Link>
            </div>
            <h1>Create a dog:</h1>
        <form onSubmit = {handleSubmit}>
            <div >
       

                    <label>Name:</label>
                    <input  key="name" type="text" name="name" placeholder="Insert name..."  onChange={(e)=>handleInputChange(e)} value={input.name}/>
                    
                    <br/>
                
                    <label>Height:</label>
                    <input key="height" type="text" name="height" placeholder="Insert height..."  onChange={(e)=>handleInputChange(e)} value={input.height}/>
                   
                    <br/>
                 
                    <label>Weight:</label>
                    <input key="weight" type="text" name="weight" placeholder="Insert weight..."  onChange={(e)=>handleInputChange(e)} value={input.weight}/>
                   
                    <br/>

                    <label>Life Span:</label>
                    <input  key="life_span" type="text" name="life_span" placeholder="Insert life span..." onChange={(e)=>handleInputChange(e)} value={input.life_span}/>
                    
                    <br/>


                    <label>Temperaments:</label>
                    <select  key="temperaments" name="temperaments" onChange={(e) => handleSelect(e)} required value={input.temperaments}>
                        {
                            temperaments?.map((e) => (
                                <option value={e.id} key={e.id}>
                                    {e.name}
                                </option>
                            ))
                        }
                    </select>
                    
                    <br/>
                    <ul><li>{input.temperaments.map(el=>el+ " ,")}</li></ul>
                    <button  type= "submit" name= "submit" onClick={(e)=>handleSubmit(e)}>Create</button>
             
            </div>
        </form>
        </React.Fragment>
    )

}