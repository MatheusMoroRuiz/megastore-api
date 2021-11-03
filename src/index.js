require("dotenv-safe").config();

process.env.SECRET

var express = require("express");
var morgan = require("morgan");
const { database } = require("./models");
var app = express();

app.use(express.json());

app.use(morgan("combined"));

var usuarios = require("./routes/usuarios");
var produto = require("./routes/produtos");
var categoria = require("./routes/categorias");
var venda = require("./routes/venda");

app.use("/usuarios", usuarios);
app.use("/produtos", produto);
app.use("/categorias", categoria);
app.use("/vendas", venda);


app.get("/", function (req, res) {
  res.send("VENDAS API");
});

database.sync().then(() => {
  app.listen(process.env.PORT, function () {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
  });
});
