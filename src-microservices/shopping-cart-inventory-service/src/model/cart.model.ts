


module.exports = (sequelize: any, Sequelize: any) => {
    const Cart = sequelize.define("table_cart", {
      username: {
        type: Sequelize.STRING
      },
      idCustomer: {
        type: Sequelize.STRING
      },
      createdDate: {
        type: Sequelize.DATE,
        default: Date.now()
      },
      isDelete: {
        type: Sequelize.INTEGER,
        default: 0
      },
      updatedDate: {
        type: Sequelize.DATE,
        default: Date.now()
      },
      createdBy: {
        type: Sequelize.STRING,
        default: ''
      },
      updatedBy: {
        type: Sequelize.STRING,
        default: ''
      }
    });
    
    return Cart;
  };
  





