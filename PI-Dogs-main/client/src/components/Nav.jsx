import React from "react";
import { Link } from "react-router-dom";



export default function Nav(){
    return(
        // Icono

        // Link a home 

        // Drop down de show perros

        // About 

        // <SearchBar>
        <nav>
            <div>
            <Link to="/home"><img src="C:\Users\franc\Desktop\PI-DOGS\PI-Dogs-main\client\public\favicon.ico" alt="icono"></img></Link>
            </div>
           
           <div>
            <Link to = "/dogs"> 
                <button >Create a dog</button>
            </Link>
            </div>

            
        </nav>


    )
        
    

}