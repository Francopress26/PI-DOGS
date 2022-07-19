const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const routeDogs = require("./dogs");
const routeTemperaments = require("./temperament");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);





 router.use('/dogs', routeDogs);
router.use("/temperaments", routeTemperaments);



module.exports = router;
