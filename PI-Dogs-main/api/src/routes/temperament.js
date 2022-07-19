const { Router } = require('express');
const router = Router();
require('dotenv').config();
const axios = require("axios");
const {Temperament } = require("../db.js")
const {API_KEY}=process.env;




router.get("/", async (req,res)=>{
    var {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    let Temperaments=[]
    data.forEach(e => { 
        if(typeof(e.temperament) === "string"){ 
            Temperaments=Temperaments.concat(e.temperament.split(", "))
        }     
    });
    Temperaments= [...new Set(Temperaments)]
    Temperaments=Temperaments.filter(name=>name !=="Hardworking") // El unico elemento q me llegaba hardworking hard-working
    Temperaments.sort()
    Temperaments.forEach(temp =>{
       Temperament.findOrCreate({where:{name:temp}})
     })
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments)
})

module.exports = router; 
