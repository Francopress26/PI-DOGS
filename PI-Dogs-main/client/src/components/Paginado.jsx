import React from 'react';
import style from "./Paginado.module.css"

export default function Paginado({dogsXPage,allDogs,paginado}){
    const pageNumbers=[]


    for (let  i= 1;  i<= Math.ceil(allDogs/dogsXPage); i++) {
        pageNumbers.push(i)
        
    }



    return(

        
            <div > 
                {   pageNumbers &&
                    pageNumbers.map(num=>(
                        <span key={num} className={style.span}>
                           
                            <button  onClick={()=>paginado(num) }className={style.button} >{num}</button>
                            
                        </span>
                    ))
                }
            </div>
        
    )

}