
const { Router} = require('express');
const router = Router();
require('dotenv').config();
const axios = require("axios");
const { Dog, Temperament } = require("../db.js")
const {API_KEY}=process.env;




const getApiInfo = async () =>{
    const apiURL= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfo = await apiURL.data.map(inf =>{
        return{
            name:inf.name,
            height:inf.height.metric,
            weight:inf.weight.metric,
            life_span:inf.life_span,
            temperament:inf.temperament
            

        }
    });
    return apiInfo
}

const getDBInfo = async ()=>{
    return await Dog.findAll({
          // Busca todos los perros de la BD y ademas incluye el model Temperament
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
    const allInfo=apiInfo.concat(DBInfo);
    return allInfo;

}
router.get('/', async (req,res)=>{
 // name x query || si no me pasan name hago el get normal, asi me ahorro 1 ruta
 const name = req.query.name
 let AllDogs=await unificateAllInfo()
    if(name){
        let AllDogsByName = await AllDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
        AllDogsByName.length ? 
        res.status(200).send(AllDogsByName)
        :
        res.status(404).send("No se encontraron perros con ese nombre") 
    }else{
        
        res.status(200).send(AllDogs)
    }
})

router.get("/:id", async (req, res, next) => {
    let id =req.params.id

    if(id.length<4){ // como es una string, la api no tiene mas de 1000 perros entonces la id nunca va a superar las 4 cifras

          const dogsById = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
          const dogFinded=dogsById.data.find(dog => dog.id === parseInt(id))
            if(dogFinded){
                res.status(200).json(dogFinded)
            }else{
                res.status(404).send("Dog not found :(")
            }
            
      

    }else{
        const dogById= await Dog.findByPk(id)
            if(dogById){
                res.status(200).json(dogById)
            }else{
                res.status(404).send("Dog not found :(")
            }
     
      
       
    }

   


    // if(id){
    //    let dogById = await allDogs.filter(e=> e.id ===id)
    //    console.log(`Perro por id ${dogById}`)
    //     dogById.length ? 
    //     res.status(200).json(dogById)
    //     :
    //     res.status(404).send("Not Found")
    // }
})


router.post("/", async (req, res, next) => {
    const {name,height,weight,life_span,temperament}=req.body
        try {
            createNewDog = await Dog.create({name, height, weight, life_span})
            let TemperamentSplit=[]
            TemperamentSplit=TemperamentSplit.concat(temperament.split(", "))
            createNewDog.addTemperament() // Espera el ID del temperamento pero tengo que hacer que reciba el string
            //Podria hacer un arreglo de las strings, buscar cada elemento del arreglo en la BD de temperamentos y una vez lo encuentro
            // preguntar por el id? Guardar todos los id en otro arreglo y despues con un for ir agregando ?
            for (let index = 0; index < TemperamentSplit.length; index++) {
               let actual= await Temperament.findOne({ where: { name:TemperamentSplit[index] } });
                 createNewDog.addTemperament(actual.id)
            }           
        } catch (error) {
            next(error)
        }
        res.send("Perro creado con exito!!!!")
   
    

    
    
    
})






module.exports = router;

