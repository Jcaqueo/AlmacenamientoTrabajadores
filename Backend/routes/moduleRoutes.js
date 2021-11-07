const express = require("express");
const router = express.Router();
const { Module }  = require("../models");
const verifySign = require("./verifyToken");

// const dat= new Date(); //Obtienes la fecha
// const dat2 = Date.parse(dat); //Lo parseas para transformarlo



router.post("/create", async (req, res) => {
    try {
      const nameValid = await Module.findOne({
        where: {
          name: req.body.name,
        },
      });
      if (nameValid) return res.status(400).send("Nombre de proyecto en uso");
      //se crea el proyecto
      const module = await Module.create({
          name: req.body.name,
          date: Date.now(),
          status: "0",
          text_status: "Nuevo",
          id_proyect: Number(req.body.id_proyect),
          id_developer : Number(req.body.id_developer),
          progress: "Nuevo"
      });
      
      return res.send(module);
    } catch (error) {

      return res.status(400).send(error);
    }
});


router.post("/update/:id", async (req, res) => {
    
    try {
    const module = await Module.findOne({where: req.params});
    if (!module) return res.status(400).send("este modulo no existe");
       
  
    //cambiamos los valores en la bd
    if(req.body.name != undefined) 
        module.name = req.body.name;
    if(req.body.status != undefined)
        module.status = req.body.status;
    if(req.body.text_status != undefined)
        module.text_status = req.body.text_status;
    if(req.body.id_proyect != undefined)
        module.id_proyect = req.body.id_proyect;
    if(req.body.id_developer != undefined)
        module.id_developer = req.body.id_developer;
    if(req.body.progress != undefined)
        module.progress = req.body.progress;
    
    await module.save();
    return res.send(module);  
  
    } catch (error) {
      return res.status(400).send(error);
    }
});



router.get("/cliente/:id_proyect",verifySign, async (req,res) => {
    try {
        const allmodule = await Module.findAll({where: req.params});
        res.send(allmodule);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
    }
});
router.get("/developer",verifySign, async (req,res) => {
    try {
        const allmodule = await Module.findAll({
            where: {
                id_developer: req.user.id,
              },
        });
        res.send(allmodule);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
        
    }
});

router.get("/:id",verifySign, async (req,res) => {
    try {
        const allmodule = await Module.findOne({where: req.params});
        res.send(allmodule);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
    }
});

router.get("/progreso/:id",verifySign, async (req,res) => {
    try {
        const allmodule = await Module.findOne({where: req.params});
        res.send(allmodule);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
    }
});






module.exports = router;