const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifySign = require("./verifyToken");

router.post("/register/client", async (req, res) => {
  const { Client } = require("../models");
  try {
    const emailValid = await Client.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (emailValid) return res.status(400).send("este usuario ya existe");
    //se encripta la constrasena
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.pass, salt);
    //se crea el usuario
    const client = await Client.create({
        name: req.body.name,
        pass: hashPass,
        phone: req.body.phone,
        email: req.body.email,
        company: req.body.company,
    });

    return res.send(client);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/login/client", async (req, res) => {
  const { Client } = require("../models");
  try {
    const client = await Client.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!client) return res.status(400).send("usuario o contrasena equivocada");
    const validPass = await bcrypt.compare(req.body.pass, client.pass);
    if (!validPass)
      return res.status(400).send("usuario o contrasena equivocada");
    const token = jwt.sign({ id: client.id }, process.env.SECRET_TOKEN);
    //res.setHeader('auth', token);
    //res.set('auth', token)
    return res.send([token,client.name]);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/update/client", verifySign,async (req, res) => {
  const { Client } = require("../models");
  
  try {
    const client = await Client.findOne({where: {
      id: req.user.id,    
    },});
    
    if (!client) return res.status(400).send("este usuario no existe");

    // const validPass = await bcrypt.compare(req.body.pass, client.pass);
    // if (!validPass) return res.status(400).send("contrasena equivocada");


    //cambiamos los valores en la bd
    if(req.body.name != '') 
      client.name = req.body.name;
    if(req.body.newpass != undefined){
      //encriptamos la nueva contrasena
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.newpass, salt);


      client.pass = hashPass;
    }
    if(req.body.phone != '')
      client.phone = req.body.phone;
    if(req.body.email != '')
      client.email = req.body.email;
    if(req.body.company != '')
      client.company = req.body.company;

    await client.save();
    return res.send(client);
    


  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/register/developer", async (req, res) => {
  const { Developer } = require("../models");
  try {
    const emailValid = await Developer.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (emailValid) return res.status(400).send("este usuario ya existe");
    //se encripta la constrasena
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.pass, salt);
    //se crea el usuario
    const developer = await Developer.create({
        name: req.body.name,
        pass: hashPass,
        phone: req.body.phone,
        email: req.body.email,
        company: req.body.company,
    });
    return res.send(developer);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/login/developer", async (req, res) => {
  const { Developer } = require("../models");
  try {
    const developer = await Developer.findOne({
      where: {
       email: req.body.email,
      },
    });
    if (!developer) return res.status(400).send("usuario o contrasena equivocada");
    const validPass = await bcrypt.compare(req.body.pass, developer.pass);
    if (!validPass)
      return res.status(400).send("usuario o contrasena equivocada");
    const token = jwt.sign({ id: developer.id }, process.env.SECRET_TOKEN);
    return res.send([token,developer.name]);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/update/developer/:id", async (req, res) => {
  const { Developer } = require("../models");
  
  try {
    const developer = await Developer.findOne({where: req.params});
    if (!developer) return res.status(400).send("este usuario no existe");

    const validPass = await bcrypt.compare(req.body.pass, developer.pass);
    if (!validPass) return res.status(400).send("contrasena equivocada");

   

    //cambiamos los valores en la bd
    if(req.body.name != undefined)
      developer.name = req.body.name;
    if(req.body.newpass != undefined){
      //encriptamos la nueva contrasena
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.newpass, salt);

      developer.pass = hashPass;
    }
    if(req.body.phone != undefined)
      developer.phone = req.body.phone;
    if(req.body.email != undefined)
      developer.email = req.body.email;
    if(req.body.company != undefined)
      developer.company = req.body.company;

    await developer.save();
    return res.send(developer);
    


  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/register/pm", async (req, res) => {
  const { Jp } = require("../models");
  try {
    const emailValid = await Jp.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (emailValid) return res.status(400).send("este usuario ya existe");
    //se encripta la constrasena
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.pass, salt);
    //se crea el usuario
    const jp = await Jp.create({
        name: req.body.name,
        pass: hashPass,
        phone: req.body.phone,
        email: req.body.email,
        company: req.body.company,
    });
    return res.send(jp);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/login/ProyectManager", async (req, res) => {
  const { Jp } = require("../models");
  try {
    const jp = await Jp.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!jp) return res.status(400).send("usuario o contrasena equivocada");
    const validPass = await bcrypt.compare(req.body.pass, jp.pass);
    if (!validPass)
      return res.status(400).send("usuario o contrasena equivocada");
    const token = jwt.sign({ id: jp.id }, process.env.SECRET_TOKEN);
    //res.setHeader('auth', token);
    //res.set('auth', token)
    return res.send([token,jp.name]);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/update/ProyectManager", verifySign,async (req, res) => {
  const { Jp } = require("../models");
  
  try {
    const jp = await Jp.findOne({where: {
      id: req.user.id,    
    },});
    if (!jp) return res.status(400).send("este usuario no existe");

    // const validPass = await bcrypt.compare(req.body.pass, developer.pass);
    // if (!validPass) return res.status(400).send("contrasena equivocada");

   

    //cambiamos los valores en la bd
    if(req.body.name != '')
      jp.name = req.body.name;
    if(req.body.newpass != undefined){
      //encriptamos la nueva contrasena
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.newpass, salt);

      jp.pass = hashPass;
    }
    if(req.body.phone != '')
      jp.phone = req.body.phone;
    if(req.body.email != '')
      jp.email = req.body.email;
    if(req.body.company != '')
      jp.company = req.body.company;

    await jp.save();
    return res.send(jp);
    


  } catch (error) {
    return res.status(400).send("malardo manito " + error);
  }
});





module.exports = router;