const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifySign = require("./verifyToken");

router.post("/create",async (req, res) => {
    const { Comment } = require("../models");
    try {
      const comment = await Comment.create({
          grade: req.body.grade,
          comment: req.body.comment,
          id_developer: Number(req.body.id_developer),
          createdAT : 1,
          updatedAt : 2
      });
      return res.send(comment);
    } catch (error) {
      return res.status(400).send(error);
    }
});

router.get("/get/:id_developer",verifySign, async (req,res) => {
    const { Comment } = require("../models");
    try {
        const comments = await Comment.findAll({
            where:req.params
        });
        res.send(comments);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
    }
});

router.get("/get/chat/:id_modulo",verifySign, async (req,res) => {
    const { Chat } = require("../models");
    try {
        const chats = await Chat.findAll({
            where:req.params
        });
        res.send(chats);
    } catch (error) {
        res.status(400).send("Error al hacer una query a la base de datos");
        console.log(error);
        
    }
});


router.post("/create/chat",async (req, res) => {
    const { Chat } = require("../models");
    try {
      const chat = await Chat.create({
          text: req.body.text,
          name: req.body.name,
          id_modulo: req.body.id_modulo
      });
      return res.send(chat);
    } catch (error) {
      return res.status(400).send(error);
    }
});



module.exports = router;