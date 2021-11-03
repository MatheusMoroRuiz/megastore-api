var express = require("express");
const auth = require("../auth");
const { Venda, VendaItem, Produto } = require("../models");
var router = express.Router();

router.get("/", auth, async function (req, res) {
    res.send(await Venda.findAll({include: ["items"]}));
});
  
router.post("/", async function (req, res) {
    try {
      var venda = await Venda.create(req.body);
     await req.body.items.forEach(async item => {
          const produto = await Produto.findByPk(item.produtoId)
          await venda.addItem(produto, { through: item })
      });
      res.send(venda);
    } catch (e) {
      res.status(500).send(e);
    }
});
  
  router.get("/:id", auth, async function (req, res) {
    var venda = await Venda.findByPk(req.params.id, {include: ["items"]});
    try {
      if (venda == null) throw new Error("Venda não existe");
  
      res.send(venda);
    } catch (e) {
      res.status(500).send({ erro: e.message });
    }
  });
  
  router.put("/:id", auth, async function (req, res) {
    var venda = await Venda.findByPk(req.params.id);
  
    try {
      if (venda == null) throw new Error("Venda não existe");
  
  
      await venda.update(req.body);
  
      await venda.reload();
  
      res.send(venda);
    } catch (e) {
      res.status(500).send({ erro: e.message });
    }
  });
  
  router.delete("/:id", auth, async function (req, res) {
    var venda = await Venda.findByPk(req.params.id);
    try {
      if (venda == null) throw new Error("Venda não existe");
  
      await venda.destroy();
      
      res.send(true);
    } catch (e) {
      res.status(500).send({ erro: e.message });
    }
  });
  
  module.exports = router;
  