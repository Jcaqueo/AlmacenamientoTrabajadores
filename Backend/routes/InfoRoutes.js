const router = require("express").Router();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const verifySign = require("./verifyToken");

router.get("/client",verifySign, async (req,res) => {
    const { Client } = require("../models");
    try {
        const allclient = await Client.findAll();
        res.send(allclient);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
    }
});

router.get("/clients",verifySign, async (req,res) => {
    const { Client } = require("../models");
    try {
        const allclient = await Client.findOne({
            where: {
              id: req.user.id,    
            },
          });
        res.send(allclient);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
    }
});


router.get("/proyect",verifySign, async (req,res) => {
    const { Proyect } = require("../models");
    try {
        const allproyect = await Proyect.findAll();
        res.send(allproyect);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
    }
});

router.get("/module",verifySign, async (req,res) => {
    const { Module } = require("../models");
    try {
        const allmodule = await Module.findAll();
        res.send(allmodule);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
    }
});

router.get("/alldevelopers",verifySign, async (req,res) => {
    const { Developer } = require("../models");
    try {
        const alldeveloper = await Developer.findAll();
        res.send(alldeveloper);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
    }
});

router.get("/developers/:id",verifySign, async (req,res) => {
    const { Developer } = require("../models");
    try {
        const developer = await Developer.findOne({
            where:req.params,
        });
        res.send(developer);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
    }
});

router.get("/ProyectManagers",verifySign , async (req,res) => {
    const { Jp } = require("../models");
    try {
        const jp = await Jp.findOne({
          where: {
            id: req.user.id,    
          },
        });
        res.send(jp);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
    }
});


module.exports = router;