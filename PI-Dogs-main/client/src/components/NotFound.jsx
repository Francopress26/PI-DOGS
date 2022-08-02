import React from "react";
import {Link} from 'react-router-dom'
import wanted from "../imgs/Missing Dog Or Pet Wanted Template - Hecho con PosterMyWall.jpg"
import Nav from "./Nav2";
import Footer from "./Footer"
import style from "./NotFound.module.css"
export default function NotFound(){
    return(
        
    <div className={style.main}>
        <Nav></Nav>

        <div className={style.message}>
        <h1>Not Found :(</h1>

        <img src={wanted} height="500px" width="500px" alt="not found"></img>

        <Link to={`/home`} className={style.button}><button className={style.button}>Go back
            </button>
        </Link>
        </div>

        <Footer></Footer>
    </div>
    )
}