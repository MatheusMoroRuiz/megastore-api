var express = require("express");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");
var router = express.Router();
const auth = require("../auth");

router.get("/", auth, async function (req, res) {
  res.send(await Usuario.findAll());
});

router.post("/", async function (req, res) {
  try {
    var usuario = await Usuario.create(req.body);
    res.send(usuario);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", auth, async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id);
  try {
    if (usuario == null) throw new Error("Usuário não existe");

    res.send(usuario);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", auth, async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id);

  try {
    if (usuario == null) throw new Error("Usuário não existe");


    await usuario.update(req.body);

    await usuario.reload();

    res.send(usuario);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", auth, async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id);
  try {
    if (usuario == null) throw new Error("Usuário não existe");

    await usuario.destroy();
    
    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.post("/login", async function(req, res) {

  try{
    if(!req.body.email || !req.body.senha)
    throw new Error("E-mail ou senha inválidos")

    const usuario = await Usuario.findOne({
      where: {
        email: req.body.email,
        senha: req.body.senha
      }
    });

    if(usuario == null) 
      throw new Error("E-mail ou senha inválidos");

      const token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
        expiresIn: 300, 
      });

      return res.send({ auth: true, token: token})
  }
  catch (e){
    res.status(500).send({erro: e.message});
  }
})

module.exports = router;
