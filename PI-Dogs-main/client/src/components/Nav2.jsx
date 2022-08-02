import React from "react";
import { Link } from "react-router-dom";
import style from "./Nav.module.css"
import back from "../imgs/icons8-left-arrow-100.png"

export default function Nav(){
    return(
   
        <nav className={style.nav}>
          <Link to="/home" className={style.link}><img src={back} alt="jaja" height="80px" className={style.icon}></img></Link> 
        </nav>


    )
        
    

}