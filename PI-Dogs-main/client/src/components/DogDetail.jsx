import React from 'react';
import {useParams} from "react-router-dom";
import{useDispatch,useSelector} from "react-redux"
import { getDetail,clearDog} from '../actions';
import {useEffect} from "react";
import imagen from "../imgs/dog-7205842_1920.jpg"
import style from "./DogDetail.module.css"
import undraw from "../imgs/undraw_good_doggy_re_eet7.svg"
import Nav from "./Nav"
import Footer from './Footer';
import loader from "../imgs/loading-thinking.gif"
export default function Detail(){
    const dispatch= useDispatch()
    const {id}=useParams()
    const dogDetail=useSelector((state)=>state.dogDetail)

    
    useEffect(()=>{
        dispatch(getDetail(id));
    },[dispatch,id])

    // useEffect(()=>{
    //     return dispatch(clearDog())     
    // },[dispatch])

        function renderDog(dogDetail){
            if(dogDetail?.temperament){
                return(
                    <div className={style.main}>
                  <div className={style.card}>
                  <h1>Name: {dogDetail?.name}</h1>
                  <img src={dogDetail?.image} alt="dog" className={style.img}/>
                  <p>Height: {dogDetail?.height}</p>
                  <p>Weight: {dogDetail?.weight}</p>
                  <p>Life Span: {dogDetail?.life_span}</p>
                  <p>Temperaments: {dogDetail?.temperament}</p>  
                  </div>
                  <img src={undraw} alt="dog"></img>
                </div>
                )

            }else if(dogDetail.temperaments){
                return(
                    <div className={style.main}>
                    <div className={style.card}>
                    <h1>Name: {dogDetail?.name}</h1>
                    <img src={imagen} alt="dog"  className={style.img}/>
                    <p>Height: {dogDetail?.height}</p> 
                    <p>Weight: {dogDetail?.weight}</p>
                    <p>Life Span: {dogDetail?.life_span}</p>
                    <p>Temperaments: {dogDetail.temperaments?.map(e => `${e.name}, `)}</p>
                    </div>
                    <img src={undraw} alt="dog"></img>
                    </div>

                )

            }else{
                return(<div className={style.load}><img src={loader}alt="loader" className={style.loader}></img></div>)
            }
        }

      return(
        <React.Fragment>
        <Nav></Nav>
        <div>
           {renderDog(dogDetail)}
        </div>
            
        </React.Fragment>
           
        
    )
   
    }
    

   
    

