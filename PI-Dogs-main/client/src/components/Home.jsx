import React from "react";
import {useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from 'react-router-dom'
import { getDogs,orderByName,filterCreated } from "../actions";
import Nav from "./Nav"
import Dog from "./Dog"
import Paginado from "./Paginado"
import SearchBar from "./SearchBar";
import imagen from "../imgs/dog-gd52264106_1920.jpg"
import {Link} from 'react-router-dom'

export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=> state.allDogs)

    const [currentPage,setCurrentPage]=useState(1)
    const [dogsXPage,setDogsXPage]=useState(8)
    const indexOfLastDog = currentPage * dogsXPage
    const indexOfFirstDog = indexOfLastDog - dogsXPage
    const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog)
    const [orden,setOrden]=useState("")

    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
   

    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    function handleFilterNames(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordered by ${e.target.value}`)   /// PARA DESPUES: FIJARTE SI PUEDO ASIGNARLE LOS DEMAS ESTADOS LOCALES PARA Q NO CAMBIE EL FILTRADO WN
    }

    function handleCreatedBy(e){
        dispatch(filterCreated(e.target.value))
    }


    return(
        <React.Fragment>
            {/* <header>
            <Nav></Nav>
            </header> */}

            
            <h1>Perritos lindos</h1>
        
            <select onChange={e=>handleFilterNames(e)}>
                <option value="Asc">Order A-Z</option>
                <option value="Desc">Order Z-A</option>
            </select>
            <select>
                <option value="orderTEMP">Order by temperament</option>    
            </select>

            <select >
                    <option value="orderHEAVY">Order by heaviest</option> 
                    <option value="orderLIGTH">Order by lightest</option> 
            </select>
            <select onChange={e=>handleCreatedBy(e)}>   
                    <option value="orderALL">Show ALL dogs</option> 
                    <option value="orderAPI">Show API dogs</option> 
                    <option value="orderBD">Show BD dogs</option> 
            </select>
            <Paginado 
            dogsXPage={dogsXPage} 
            allDogs={allDogs.length} 
            paginado={paginado}
            />
            <SearchBar/>

            {currentDogs?.map((el)=>{
                return (
                    <React.Fragment>
                       <Dog image={el.image ? el.image : imagen} name={el.name} temperament={el.createdAt ? el.temperaments.map((e)=> e.name.toString()+", ") : el.temperament } weight={el.weight}/>
                       
                    </React.Fragment>
                 )
            })

            }
            {/* OrderBy */}
            {/* Render Dogs */}
            

            <Link to="/createDog"><button>Create Dog</button></Link>
        </React.Fragment>
    )
}