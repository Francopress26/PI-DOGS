import React from 'react';
import {useParams} from "react-router-dom";
import{useDispatch,useSelector} from "react-redux"
import { getDetail } from '../actions';
import {useEffect} from "react";
import imagen from "../imgs/ze-zinedi-9TMDgKSX5Ek-unsplash.jpg"
import style from "./DogDetail.module.css"
import undraw from "../imgs/undraw_good_doggy_re_eet7.svg"
import Nav from "./Nav"
import Footer from './Footer';
export default function Detail(){
    const dispatch= useDispatch()
    const {id}=useParams()
    const dogDetail=useSelector((state)=>state.dogDetail)
    
    useEffect(()=>{
        dispatch(getDetail(id));
    },[dispatch,id])
     
     
     console.log(dogDetail)

    //El get detail con un id de la API si anda, no anda el get detail con un id de la BD

    function renderDog(dogDetail){
        

        if(dogDetail.bred_for){

            return(
              <div className={style.main}>
                <div className={style.card}>
                <h1>Name: {dogDetail?.name}</h1>
                <img src={dogDetail?.image.url} alt="dog" className={style.img}/>
                 <p>Height: {dogDetail?.height.metric}</p>
                <p>Weight: {dogDetail?.weight.metric}</p>
                <p>Life Span: {dogDetail?.life_span}</p>
                <p>Temperaments: {dogDetail?.temperament}</p>  
                </div>

                <img src={undraw} alt="dog"></img>
              </div>
            )
        }
        
        else{
            if(!dogDetail.bred_for){
                return(
                    <div className={style.main}>
                        <div className={style.card}>
                    <h1>{dogDetail.name}</h1>
                    <img src={imagen} alt="dog"  className={style.img}/>
                    <p>{dogDetail.height}</p> 
                    <p>{dogDetail.weight}</p>
                    <p>{dogDetail.life_span}</p>
                    <p>{dogDetail.temperaments?.map(e => `${e.name}, `)}</p>
                    </div>
                    <img src={undraw} alt="dog"></img>
                    </div>
    
                )


            }
           
       
        }
    }
    

    return(
        <React.Fragment>
        <Nav></Nav>
        <div>
            {dogDetail ? 
            renderDog(dogDetail)
            :
            <h1>Loading...</h1>
          
            
            }
        </div>
            <Footer></Footer>
        </React.Fragment>
           
        
    )
    
}
