import React from "react";
import style from "./About.module.css"
import html from "../imgs/html-svgrepo-com.svg"
import css from "../imgs/css-svgrepo-com.svg"
import js from "../imgs/js-svgrepo-com.svg"
import react from "../imgs/react-svgrepo-com.svg"
import redux from "../imgs/redux-svgrepo-com.svg"
import node from "../imgs/node-svgrepo-com.svg"
import express from "../imgs/express-svgrepo-com.svg"
import postgres from "../imgs/pgsql-svgrepo-com.svg"
import sequelize from "../imgs/sequelize-svgrepo-com.svg"
import linkedin from "../imgs/linkedin-svgrepo-com.svg"
import github from "../imgs/github-svgrepo-com.svg"
import tel from "../imgs/telephone-svgrepo-com.svg"
import mail from "../imgs/mail-svgrepo-com.svg"
import Nav2 from "./Nav2";
import Footer from "./Footer";

export default function About(){
    return(
        <React.Fragment>
            <div className={style.main}>
            <Nav2></Nav2>

            <h1>SPA made for Henry</h1>
            <p> This is a proyect done for the bootcamp Henry, where i had to build a SPA(Single Page Application).</p>
            <p>They gave me the theme of dogs and the requisites were to use all the knowledge adquired in the bootcamp that included:</p>
            <p>HTML <img src={html} alt="jaja" width="50px" height="50px"/></p>
            <p>JavaScript <img src={js} alt="jaja" width="50px" height="50px"/></p>
            <p>React <img src={react} alt="jaja" width="50px" height="50px"/></p>
            <p>Redux <img src={redux} alt="jaja" width="50px" height="50px"/></p>
            <p>Node <img src={node} alt="jaja" width="50px" height="50px"/></p>
            <p>CSS <img src={css} alt="jaja" width="50px" height="50px"/></p>
            <p>Express <img src={express} alt="jaja" width="50px" height="50px"/></p>
            <p>Postgres <img src={postgres} alt="jaja" width="50px" height="50px"/></p>
            <p>Sequelize <img src={sequelize} alt="jaja" width="50px" height="50px"/></p>
            <p>This was my first project, it´s no-responsive and it has a lot of features that i would like to add. I´m looking forward to add more technologies and improve my skills</p>
            <p>If you liked it, or you have any suggestions you can contact me:</p>
            <p><a href="https://www.linkedin.com/in/franco-pressenda-163a81228/"  target="_blank"> Linkedin  <img src={linkedin} alt="jaja" width="50px" height="50px"/> </a></p>
            <p><a href="https://github.com/Francopress26"  target="_blank">GitHub <img src={github} alt="jaja" width="50px" height="50px"/> </a></p>
            <p>Tel +54 3436 615767  <img src={tel} alt="jaja" width="30px" height="30px"/></p>
            <p>Mail francopress26@hotmail.com <img src={mail} alt="jaja" width="30px" height="30px"/></p>
            </div>

            <Footer></Footer>
        </React.Fragment>
            


    )
        
    

}