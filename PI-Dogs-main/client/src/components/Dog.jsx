import React from "react";

export default function Dog({image,name,temperament,weight}){
    return(
    <div>
        <img src={image} alt="dog" width="250px" height="200px"></img>
        <h3>{name}</h3>
        <p>{temperament}</p>
        <p>{weight}</p>
    </div>
    )
}