const express = require("express");
const router = express.Router();
const { Proyect }  = require("../models");
const verifySign = require("./verifyToken");


router.post("/create", async (req, res) => {
    try {
      const nameValid = await Proyect.findOne({
        where: {
          name: req.body.name,
        },
      });
      if (nameValid) return res.status(400).send("Nombre de proyecto en uso");
      //se crea el proyecto
      const proyect = await Proyect.create({
          name: req.body.name,
          date: Date.now(),
          status: "0",
          text_status: "Nuevo",
          id_client: Number(req.body.client)
      });

      return res.send(proyect);
    } catch (error) {
      return res.status(400).send(error);
    }
});


router.post("/update/:id", async (req, res) => {
    
    try {
    const proyect = await Proyect.findOne({where: req.params});
    if (!proyect) return res.status(400).send("este proyecto no existe");
       
  
    //cambiamos los valores en la bd
    if(req.body.name != "") 
        proyect.name = req.body.name;
    if(req.body.status != "")
        proyect.status = req.body.status;
    if(req.body.text_status != undefined)
        proyect.text_status = req.body.text_status;
    if(req.body.client != "")
        proyect.id_client = Number(req.body.client);
    
    await proyect.save();
    return res.send(proyect);  
  
    } catch (error) {
      return res.status(400).send(error);
    }
});


router.get("/cliente",verifySign , async (req,res) => {
    try {
        const allProyect = await Proyect.findAll({
          where: {
            id_client: req.user.id,
          },
        });
        res.send(allProyect);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
    }
});

router.get("/ProyectManager",verifySign , async (req,res) => {
  try {
      const allProyect = await Proyect.findAll();
      res.send(allProyect);
  } catch (error) {
      res.status(400).send("Error al hacer una query a la base de datos");
      console.log(error);
      
  }
});

module.exports = router;