
module.exports = (sequelize: any, Sequelize: any) => {
    const CartItem = sequelize.define("t_cart_item", {
      idCart: {
        type: Sequelize.INTEGER
      },
      idProduct: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
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
  
    return CartItem
  };
  



