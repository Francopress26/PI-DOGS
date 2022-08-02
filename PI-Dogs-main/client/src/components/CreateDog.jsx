import React, { useEffect } from "react";
import {useState} from 'react'
 import { useDispatch,useSelector} from "react-redux";
import { postDog,getTemperaments } from "../actions";
import {useHistory } from 'react-router-dom'
import Nav2 from "./Nav2"
import style from "./CreateDog.module.css"
import undrawImg from "../imgs/undraw_content_re_33px.svg"
import Footer from "./Footer"

export function validate(input) {

    let errors = {};
    
    
    if (!input.name) {
      errors.name = 'Name is required';
    }
    if(!input.name.trim() || !/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(input.name) || input.name.length < 3){
        errors.name='Name has to be longer than 3'
        
     }


    if (!input.height) {
      errors.height = 'Height is required';
    } else if (!/\d{1,2}-\d{1,2}/g.test(input.height)) {
        errors.height = "Add a height range. Example: '10-12'"
       
    }else if(/[a-zA-Z]/.test(input.height)){
        errors.height="Can´t contain letters"
    }
    let heightValidate=input.height.split("-")
    heightValidate.map(e=>Number(e))
     if(heightValidate[0]>100){
        errors.height="Too much for minimum height"
    } else if(heightValidate[1]>150){
        errors.height="Too much for max height"
    }else if(heightValidate[0]>heightValidate[1]){
        errors.height="Minimum cant be higher than maximum"
    }


    
    if (!input.weight) {
        errors.weight = "Weight is required";
    } else if (!/\d{1,2}-\d{1,2}/g.test(input.weight)) {
        errors.weight = "Add a weight range. Example: '10-12'"
    }else if(/[a-zA-Z]/.test(input.weight)){
        errors.weight="Can´t contain letters"
    }
    let weightValidate = input.weight.split("-")
    weightValidate.map(e=>Number(e))
    if(weightValidate[0]>50){
        errors.weight="Too much for minimum weight"
    }else if(weightValidate[1]>200){
        errors.weight="Too much for maximum weight"
    }else if(weightValidate[0]>weightValidate[1]){
        errors.weight="Minimum cant be higher than maximum"
    }
    

    if (!input.life_span) {
        errors.life_span = "Life Span is required"
    }else if(!/\d{1,2}-\d{1,2}/g.test(input.life_span)){
        errors.life_span="Add a life span range. Example:'9-12'"
    } else if(/[a-zA-Z]/.test(input.life_span)){
        errors.life_span="Can´t contain letters"
    }
    let life_spanValidate=input.life_span.split("-")
    if(Number(life_spanValidate[0])>15){
        errors.life_span="Dogs can´t live that longer :(, sorry"
    }else if(Number(life_spanValidate[1])>25){
        errors.life_span="Dogs can´t live that longer :(, sorry"
    }else if(Number(life_spanValidate[0]>Number(life_spanValidate[1]))){
        errors.life_span="Minimum cant be higher than maximum"
    }



    


    
    return errors;
};

export default function CreateDog(){

    const dispatch= useDispatch();
    const history=useHistory()
    const temperaments= useSelector((state)=>state.temperaments)
    const [errors,setErrors]=useState({})

    const[input,setInput]=useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperaments: [],
    })

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])

    function handleInputChange(e){
      
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    
    }

    function handleSelect(e){

        if (input.temperaments.includes(e.target.value)) {
            alert("You already selected this temperament. Try again.");
          } else {
              setInput({
            ...input,
            temperaments:[...input.temperaments,e.target.value] 
            })
          }

    }
    function handleSubmit(e){
        e.preventDefault()
        if(input.name && input.height && input.weight && input.life_span && input.temperaments.length && !errors.name && !errors.weight && !errors.height && !errors.life_span){
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
       
    }
    function handleDelete(el){
        setInput({
            ...input,
            temperaments:input.temperaments.filter(temp=>temp!==el)
        })
    }
    return(
        <React.Fragment>
          <Nav2></Nav2>

        <div className={style.content}> 
            <div>
            <h1>Create a dog:</h1>
            <img src={undrawImg} alt="jaja" width="800px"></img>
            </div>

        <div className={style.main}>
        
        <form onSubmit = {handleSubmit} >
            <div className={style.form}>
    
                    
                    <label>Name:</label>
                    <input  key="name" type="text" name="name" placeholder="Insert name..." className={style.input}  onChange={(e)=>handleInputChange(e)} value={input.name}/>
                    {errors.name && (<span className={style.danger}>{errors.name}</span>)}
                    <br/>
                
                    <label>Height:</label>
                    <input key="height" type="text" name="height" placeholder="Insert height..." className={style.input}  onChange={(e)=>handleInputChange(e)} value={input.height}/>
                    {errors.height && (<span className={style.danger}>{errors.height}</span>)}
                    <br/>
                 
                    <label>Weight:</label>
                    <input key="weight" type="text" name="weight" placeholder="Insert weight..." className={style.input}  onChange={(e)=>handleInputChange(e)} value={input.weight}/>
                    {errors.weight && (<span className={style.danger}>{errors.weight}</span>)}
                    <br/>

                    <label>Life Span:</label>
                    <input  key="life_span" type="text" name="life_span" placeholder="Insert life span..." className={style.input} onChange={(e)=>handleInputChange(e)} value={input.life_span}/>
                    {errors.life_span && (<span className={style.danger}>{errors.life_span}</span>)}
                    <br/>


                    <label>Temperaments:</label>
                    <select  key="temperaments" name="temperaments" className={style.input2} onChange={(e) => handleSelect(e)} required value={input.temperaments}>
                    <option hidden selected>Selecciona una opción</option>
                    {/* <option disabled selected>Selecciona una opción</option> */}
                        {
                            
                            temperaments?.map((e) => (
                                <option value={e.id} key={e.id} className={style.select}>
                                    {e.name}
                                </option>
                            ))
                        }
                    </select>
                    {errors.temperaments && (<span className={style.danger}>{errors.temperaments}</span>)}
                    <br/>
                  
                    
                    <button  type= "submit" name= "submit" onClick={(e)=>handleSubmit(e)} className={style.button}> 
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span> CREATE
                    </button>
             
            </div>
        </form>
       
       <div className={style.temperaments}>
        <h3>Temperaments:</h3>
        {input.temperaments.map(el=>
                    <div>
                        <span>{el}</span>
                        {/* <button onClick={()=>handleDelete(el)} >X</button> */}
                        <button className={style.delete} onClick={()=>handleDelete(el)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="25" width="25">
                        <path fill="#6361D9" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                         </svg>
  
                        </button>
                    </div>
                    )}
        </div>

        </div>

        </div>

        <Footer></Footer>
        </React.Fragment>
    )

}