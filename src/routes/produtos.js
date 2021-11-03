var express = require("express");
const auth = require("../auth");
const { Produto } = require("../models");
var router = express.Router();

router.get("/", auth, async function (req, res) {
    res.send(await Produto.findAll());
});

router.post("/", async function(req, res){
    try {
        var produto = await Produto.create(req.body);
        res.send(produto);
    } 
    catch (e) {
        res.status(500).send(e);
    }
});

router.get("/:id", auth, async function(req, res){
    var produto = await Produto.findByPk(req.params.id);
    try {
        if (produto == null) throw new Error("Produto não existe");
    
        res.send(produto);
    } 
    catch (e) {
        res.status(500).send({ erro: e.message });
    }
});

router.put("/:id", auth, async function(req, res){
    var produto = await Produto.findByPk(req.params.id);

    try {
      if (produto == null) throw new Error("Produto não existe");
  
  
      await produto.update(req.body);
  
      await produto.reload();
  
      res.send(produto);
    } catch (e) {
      res.status(500).send({ erro: e.message });
    }
});

router.delete("/:id", auth, async function (req, res) {
    var produto = await Produto.findByPk(req.params.id);
    try {
      if (produto == null) throw new Error("Produto não existe");
  
      await produto.destroy();
      
      res.send(true);
    } catch (e) {
      res.status(500).send({ erro: e.message });
    }
  });

module.exports = router;