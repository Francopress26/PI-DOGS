import React from "react";
import { NavLink } from "react-router-dom";
 import style from "./Landing.module.css";
 import paw from "../imgs/paw.png"


function Landing(){ 
    return (
        <React.Fragment>
            
        <div className={style.background}>

            <h1 className={style.h1}>Dogs SPA for Henry🐶</h1>

            <h2 className={style.h2}>Looking for you new best friend?🐕</h2>

            <img src={paw} alt="paw" className={style.img}/>

            {/* <div>
              <p className={style.parraf}>Here you can find all existant breeds, and choose the one that fits you</p>
              
            </div>

            <span className={style.span}>Or create one!</span> */}


            <div className={style.divBtn}>
            <NavLink exact to = "/home">
            <button >
            <span className={style.box}>
                Lets find it!
            </span>
            </button>
            </NavLink>
            </div>

           
        </div>

        
        {/* <Footer className={style.footer}></Footer> */}
        </React.Fragment>
    )
}

export default Landing;

