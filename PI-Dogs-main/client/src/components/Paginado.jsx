import React from 'react';

export default function Paginado({dogsXPage,allDogs,paginado}){
    const pageNumbers=[]


    for (let  i= 1;  i<= Math.ceil(allDogs/dogsXPage); i++) {
        pageNumbers.push(i)
        
    }
    return(

        
            <div>
                {   pageNumbers &&
                    pageNumbers.map(num=>(
                        <span key={num}>
                            <button  onClick={()=>paginado(num)}>{num}</button>
                        </span>
                    ))
                }
            </div>
        
    )

}