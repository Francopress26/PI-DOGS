import React from "react";
import { Link } from "react-router-dom";
import icon from "../imgs/icons8-guide-dog-96.png"
import style from "./Nav.module.css"

export default function Nav(){
    return(
   
        <nav className={style.nav}>
            <img src={icon} alt="jaja" className={style.icon}/>
            
            
            <Link to="/home" className={style.link}>Home🐶</Link>
            


          
            <Link to = "/createDog" className={style.link}> 
                Create a dog
            </Link>
          


          <Link to="/About" className={style.link}>About</Link>


          <Link to="/" className={style.link}>Log out</Link>

          

            
        </nav>


    )
        
    

}