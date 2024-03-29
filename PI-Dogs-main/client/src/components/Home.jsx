import React from "react";
import {useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from 'react-router-dom'
import { getDogs,orderByName,filterCreated,orderByTemps,getTemperaments, orderByWeight,clearDog} from "../actions";
import Nav from "./Nav"
import Dog from "./Dog"

import SearchBar from "./SearchBar";
import imagen from "../imgs/dog-7205842_1920.jpg"
import loader from "../imgs/loading-thinking.gif"
import style from "./Home.module.css"
import Footer from "./Footer"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';




export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=> state.allDogs)
    const allTemps= useSelector((state)=>state.temperaments)
    // const [currentPage,setCurrentPage]=useState(1)
    // const [dogsXPage,setDogsXPage]=useState(8)
    

    
    const [currentPage, setCurrentPage] = useState(1);
  const DogPerPage = 8;
  const indexOfLastDog = currentPage * DogPerPage
    const indexOfFirstDog = indexOfLastDog - DogPerPage
     let currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog)
     const totalPage = Math.ceil(allDogs.length / DogPerPage);
    const [orden,setOrden]=useState("")
   

    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
   

    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])


    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])

    
    useEffect(()=>{
        dispatch(clearDog())
    })
    function handleFilterNames(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)  
    }

    function handleCreatedBy(e){ 
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
        setOrden(`${e.target.value}`)
        
    }

    function handleTemperaments(e){
        e.preventDefault()
        dispatch(orderByTemps(e.target.value))
        setCurrentPage(1);
        setOrden(`${e.target.value}`)
    }
  
    function handleWeights(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1);
        setOrden(`${e.target.value}`)
    }

  
 
   
    return(
        <React.Fragment>
            <header>
            <Nav></Nav>
            </header>
            <main className={style.main}>


            <SearchBar className={style.search}/>
          


            <div className={style.filters}>
            <select onChange={e=>handleFilterNames(e)} className={style.select}>
                <option hidden selected>Alphabetic order:</option>
                <option value="Asc" key="asc">Order A-Z</option>
                <option value="Desc" key="desc">Order Z-A</option>
            </select>
            






            <select onChange={e=> handleTemperaments(e)} className={style.select}>
            <option hidden selected>Order by temperament</option>
                {allTemps?.map((e)=>(
                    <option value={e.name} key={e.name}>
                        {e.name}
                    </option>
                ))}    
            </select>

            <select onChange={e=>handleWeights(e)} className={style.select}>
            <option hidden selected>Order by weight</option>
                    <option value="orderHEAVY" key="heavy">Order by heaviest</option> 
                    <option value="orderLIGHT" key="light">Order by lightest</option> 
            </select>

            <select onChange={e=>handleCreatedBy(e)} className={style.select}>
            <option hidden selected>Order by creation</option>   
                    <option value="orderALL" key="all">Show ALL dogs</option> 
                    <option value="orderAPI" key="api">Show API dogs</option> 
                    <option value="orderBD" key="bd">Show BD dogs</option> 
            </select>


            <button onClick={() => window.location.reload()} className={style.button}>Reload</button>
            </div>


            <div className={style.paginado}>
            <Pagination count={totalPage} color="primary"  onChange={(e, value) => setCurrentPage(value)} />
            </div>
           
            <div className={style.dogs2}>

            {
            !currentDogs.length >0 ? 
            <div className={style.load}><img src={loader}alt="loader" className={style.loader}></img></div>
            :
            currentDogs.map((el)=>{   
                return(    
                <div className={style.dogs} key={el.id}>   
                   <Dog image={el.image ? el.image : imagen} name={el.name} temperament={el.createdAt ? el.temperaments.map((e)=> e.name.toString()+(", ")) : el.temperament } weight={el.weight} id={el.id} className={style.cardDog}/>
                </div>  )  
        })  
            }
            </div>
            </main>
          
            
       

        </React.Fragment>
    )
}