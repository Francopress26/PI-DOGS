import React from "react";
import {useState,useRef} from 'react'
 import { useDispatch } from "react-redux";
 import { searchDog } from "../actions";
import styles from "./SearchBar.module.css"

export default function SearchBar(){

    const dispatch= useDispatch();

    const[name,setName]=useState("")
    const ref=useRef(null)

    function handleChange(e){
        e.preventDefault()
        setName(e.target.value)
        
    }

    function handleSubmit(e){
        e.preventDefault() 
        dispatch(searchDog(name))
        
        ref.current.value = '';
       
     }


    return (
        <div>
            
            <form>

                <input  ref={ref} type="text" placeholder="Insert a breed..."  onChange={(e) => handleChange(e)} className={styles.input}/>

                <button  type="submit" onClick={(e) => handleSubmit(e)} className={styles.button}>Search</button>
            </form>
        </div>
    )

}