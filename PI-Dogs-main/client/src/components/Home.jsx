import React from "react";
import {useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from 'react-router-dom'
import { getDogs,orderByName,filterCreated,orderByTemps,getTemperaments, orderByWeight,clearDog } from "../actions";
import Nav from "./Nav"
import Dog from "./Dog"
import Paginado from "./Paginado"
import SearchBar from "./SearchBar";
import imagen from "../imgs/dog-7205842_1920.jpg"

import style from "./Home.module.css"
import Footer from "./Footer"




export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=> state.allDogs)
    const allTemps= useSelector((state)=>state.temperaments)
    const [currentPage,setCurrentPage]=useState(1)
    const [dogsXPage,setDogsXPage]=useState(8)
    const indexOfLastDog = currentPage * dogsXPage
    const indexOfFirstDog = indexOfLastDog - dogsXPage
    const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog)
    const [orden,setOrden]=useState("")
    const [loading,setLoading]=useState(false)
    


    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
   

    useEffect(()=>{
        setLoading(true)
        dispatch(getDogs())
        setLoading(false)
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
    // function handleReload(){
    //     dispatch(getDogs())
        
    // }
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

            <div className={style.search}>
            <SearchBar className={style.search}/>
            </div>


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
                {/* <button value="prev" onClick={e=>handlePage(e) }>←</button> */}
            <Paginado 
            dogsXPage={dogsXPage} 
            allDogs={allDogs.length} 
            paginado={paginado}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            />
            {/* <button value="next" onClick={e=>handlePage(e) }>→</button> */}
            </div>
           
            <div className={style.dogs2}>

            {/* {currentDogs ? currentDogs.map((el)=>{
                return (
                    <div className={style.dogs}>   
                       <Dog image={el.image ? el.image : imagen} name={el.name} temperament={el.createdAt ? el.temperaments.map((e)=> e.name.toString()+(", ")) : el.temperament } weight={el.weight} id={el.id} className={style.cardDog}/>
                    </div>
                   
                 )
            }) 
            : (<h1>Not found</h1>)

            } */}
            {loading ? 
            <h1>No anda</h1>
            :
            currentDogs.map((el)=>{
                return (
                    <div className={style.dogs} key={el.id}>   
                       <Dog image={el.image ? el.image : imagen} name={el.name} temperament={el.createdAt ? el.temperaments.map((e)=> e.name.toString()+(", ")) : el.temperament } weight={el.weight} id={el.id} className={style.cardDog}/>
                    </div>
                   
                 )
            }) 
            }
            </div>
            </main>
            {/* OrderBy */}
            {/* Render Dogs */}
            
            <Footer></Footer>

        </React.Fragment>
    )
}