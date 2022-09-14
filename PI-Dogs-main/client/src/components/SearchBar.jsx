import React from "react";
import {useState,useRef} from 'react'
 import { useDispatch } from "react-redux";
 import { searchDog } from "../actions";
import styles from "./SearchBar.module.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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
     }


    return (
        <Box
        sx={{
          display: 'flex',
          
          '& > :not(style)': { m: 1 },
          alignItems:'flex-end',
          justifyContent:'flex-end',
          alignSelf:'flex-end',
          justifySelf:'end'

        }}
      >
            
            <TextField id="standard-basic" label="Breed" variant="standard" onChange={(e) => handleChange(e)} />
                {/* <input  ref={ref} type="text" placeholder="Insert a breed..."  onChange={(e) => handleChange(e)} className={styles.input}/> */}
                <Button variant="contained" onClick={(e) => handleSubmit(e)}>Search</Button>

                {/* <button  type="submit" onClick={(e) => handleSubmit(e)} className={styles.button}>Search</button> */}
            
        </Box>
    )

}