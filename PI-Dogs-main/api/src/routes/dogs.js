
const { Router} = require('express');
const router = Router();
require('dotenv').config();
const axios = require("axios");
const { Dog, Temperament } = require("../db.js")
const {API_KEY}=process.env;




const getApiInfo = async () =>{
    const apiURL= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfo = await apiURL.data.map(inf =>{
        function validate(){
            if(inf.weight.metric ==="NaN"){
                return "25-40"
            }else if(inf.weight.metric.includes("NaN")){
              let split=  inf.weight.metric.split("-")
              if(split[0]="NaN"){
                return split[1]
              }else if(split[1]="NaN"){
                return split[0]
              }
            }else{
                return inf.weight.metric
            }
        }
        
        return{
            id:inf.id,
            name:inf.name,
            height:inf.height.metric,
            weight:validate(),
            life_span:inf.life_span,
            temperament:inf.temperament,
            image:inf.image.url
        }
    });
    return apiInfo
}


const getDBInfo = async ()=>{
    return await Dog.findAll({
        include: {
          model: Temperament,
            attributes: {
              include: ['name'], 
              exclude:['createdAt', 'updatedAt']
            },
            through: {
              attributes:[]
            }
        }
      })
      

}

const unificateAllInfo = async () =>{
    const apiInfo=await getApiInfo();
    const DBInfo= await getDBInfo();
    let allInfo=[...apiInfo,...DBInfo]
    return allInfo;
}




router.get('/', async (req,res)=>{
 // name x query || si no me pasan name hago el get normal, asi me ahorro 1 ruta
 const name = req.query.name
 let AllDogs=await unificateAllInfo()
    if(name){
        try{
            let AllDogsByName = await AllDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
            AllDogsByName.length ? 
            res.status(200).send(AllDogsByName)
            :
            res.status(404).send("No se encontraron perros con ese nombre") 
        }catch(e){
            res.status(400).send("Not found :(((")
            next(error)
        }
    }else{
        res.status(200).send(AllDogs)
    }
})



router.get("/:id", async (req, res, next) => {
    let id =req.params.id
    // console.log(id)
    // console.log(typeof id)
    // console.log(id.length)

    if(id.length<5){ // como es una string, la api no tiene mas de 1000 perros entonces la id nunca va a superar las 4 cifras
          const dogsById = await getApiInfo()
          
          const dogFinded=dogsById.find(dog => dog.id === parseInt(id))
            if(dogFinded){
                res.status(200).json(dogFinded)
            }else{
                res.status(404).send("Dog not found :(")
            }   
    }else if(id.length>4){
        let allDogsBD= await  Dog.findAll({
          include: {
            model: Temperament,
              attributes: {
                include: ['name',], 
                exclude:['createdAt', 'updatedAt','id']
              },
              through: {
                attributes:[]
              }
          }     
        })
        const dogFinded=await allDogsBD.find(dog=>dog.id===id)
            if(dogFinded){
                const temperamentFilt= dogFinded?.temperaments.map(e=>e.name)
                dogFinded.temperaments=temperamentFilt
                res.status(200).json(dogFinded)
            }else{
                res.status(404).send("Dog not found :(")
            }     
    }else{
        res.status(404).send("Dog not found")
    }
})


router.post("/", async (req, res, next) => {
    const {name,height,weight,life_span,temperaments,image}=req.body
    // console.log(`Tipo del temperament ${typeof temperaments}`)
        try {
            createNewDog = await Dog.create({name, height,weight, life_span,image})
            if(typeof temperaments==="object"){
                temperaments.forEach(async element => {
                    // console.log(`Elemento:${element}`)
                    let actual= await Temperament.findOne({ where: { name:element }});
                    createNewDog.addTemperament(actual.id)  
                });
            }else{
                for (let index = 0; index < temperaments.length; index++) {
                    let actual2 = await Temperament.findOne({where:{name:temperaments[index]}})
                    createNewDog.addTemperament(actual2.id)        
                }
            }
     
         
            // TemperamentSplit=TemperamentSplit.concat(TemperamentSplit.split(", "))
            // createNewDog.addTemperament() // Espera el ID del temperamento pero tengo que hacer que reciba el string
            //Podria hacer un arreglo de las strings, buscar cada elemento del arreglo en la BD de temperamentos y una vez lo encuentro
            // preguntar por el id? Guardar todos los id en otro arreglo y despues con un for ir agregando ?
            // for (let index = 0; index < TemperamentSplit.length; index++) {
            // //    let actual= await Temperament.findOne({ where: { name:TemperamentSplit[index] } });
            // //      createNewDog.addTemperament(actual.id)
            // }  
                   
        } catch (error) {
            next(error)
        }
        res.send("Perro creado con exito!!!!")
   
    

    
    
    
})







module.exports = router;

