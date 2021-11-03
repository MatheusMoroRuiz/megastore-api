var express = require("express");
const auth = require("../auth");
const { Categoria, Produto } = require("../models");
var router = express.Router();

router.get("/", auth, async function (req, res) {
    res.send(await Categoria.findAll());
});

router.post("/", async function(req, res){
    try {
        var categoria = await Categoria.create(req.body);
        res.send(categoria);
    } 
    catch (e) {
        res.status(500).send(e);
    }
});

router.get("/:id", auth, async function(req, res){
    var categoria = await Categoria.findByPk(req.params.id);
    try {
        if (categoria == null) throw new Error("Categoria não existe");
    
        res.send(categoria);
    } 
    catch (e) {
        res.status(500).send({ erro: e.message });
    }
});

router.get("/:id/produtos", auth, async function(req, res){
    var categoria = await Categoria.findByPk(req.params.id);
    try {
        if (categoria == null) throw new Error("Categoria não existe");
    

        res.send(await Produto.findAll({
            where: {
              categoriaId: req.params.id
            }
          }));
    } 
    catch (e) {
        res.status(500).send({ erro: e.message });
    }
});

router.put("/:id", auth, async function(req, res){
    var categoria = await Categoria.findByPk(req.params.id);

    try {
      if (categoria == null) throw new Error("Categoria não existe");
  
      await categoria.update(req.body);
  
      await categoria.reload();
  
      res.send(categoria);
    } catch (e) {
      res.status(500).send({ erro: e.message });
    }
});

router.delete("/:id",auth, async function (req, res) {
    var categoria = await Categoria.findByPk(req.params.id);
    try {
      if (categoria == null) throw new Error("Categoria não existe");
  
      await categoria.destroy();
      
      res.send(true);
    } catch (e) {
      res.status(500).send({ erro: e.message });
    }
});

module.exports = router;