const dbConfig = require("../db/connect");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  charset : 'utf8mb4'
},{
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci', 
    timestamps: true,
    }}
  );

const db : any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.t_inventories = require("./inventory.model")(sequelize, Sequelize);
db.table_cart = require('./cart.model')(sequelize, Sequelize);
db.t_cart_item = require('./cart_item.model')(sequelize, Sequelize);

//db.cart.hasMany(db.t_cart_item);


module.exports = db;
