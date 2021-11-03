const sequelize = require("sequelize");
const Sequelize = require("sequelize");

const database = new Sequelize("mysql://root:@localhost:3306/vendas");

const Usuario = database.define("usuarios", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
    unique: true,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
    is: /^[0-9a-f]{64}$/i,
  },
});

const Produto = database.define("produtos", {
  id:{
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  nome:{
    type: Sequelize.STRING,
    allowNull: false
  },
  preco:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  quantidadeEstoque:{
    type: Sequelize.INTEGER,
    allowNull: false
  }  
});

const Categoria = database.define("categorias", {
  id:{
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  nome:{
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Venda = database.define("vendas", {
  id:{
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  data:{
    type: Sequelize.DATE,
    allowNull: false
  },
  status:{
    type: Sequelize.STRING,
    allowNull: false
  },
  totalBruto:{
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  desconto:{
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  totalLiquido:{
    type: Sequelize.DECIMAL,
    allowNull: false
  }
});

const VendaItem = database.define("vendaItens", {
  id:{
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  quantidade:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  preco:{
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  total:{
    type: Sequelize.DECIMAL,
    allowNull: false
  }
});

Categoria.hasMany(Produto);
Produto.belongsTo(Categoria);

Usuario.hasMany(Venda);
Venda.belongsTo(Usuario);

Venda.belongsToMany(Produto, { through: VendaItem, as: "items" });

module.exports = {
  database,
  Usuario,
  Produto,
  Categoria,
  Venda,
  VendaItem
};
