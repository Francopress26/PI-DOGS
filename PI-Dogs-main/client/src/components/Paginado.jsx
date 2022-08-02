import React from 'react';
import style from "./Paginado.module.css"

export default function Paginado({dogsXPage,allDogs,paginado,currentPage,setCurrentPage}){
    const pageNumbers=[]


    for (let  i= 1;  i<= Math.ceil(allDogs/dogsXPage); i++) {
        pageNumbers.push(i)
        
    }

    function handlePage(e){
        if(e.target.value==="prev" && currentPage>1){
            setCurrentPage(currentPage-1)
        }
        if(e.target.value==="next" && currentPage < pageNumbers.length){
            setCurrentPage(currentPage+1)
        }
    }

    return(

        
            <div >
                <button value="prev" onClick={e=>handlePage(e) }>←</button>
                {   pageNumbers &&
                    pageNumbers.map(num=>(
                        <span key={num} className={style.span}>
                           
                            <button  onClick={()=>paginado(num) }className={style.button} >{num}</button>
                            
                        </span>
                    ))
                }
                <button value="next" onClick={e=>handlePage(e) }>→</button>
            </div>
        
    )

}