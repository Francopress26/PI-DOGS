import React from "react";
import { NavLink } from "react-router-dom";
// import style from "./Landing.module.css";

function Landing(){ 
    return (
        <div>
            <h1>Hola, esta es mi landing!</h1>
            <NavLink exact to = "/home"><button>HomeEEE</button></NavLink>
        </div>
    )

}

export default Landing;

