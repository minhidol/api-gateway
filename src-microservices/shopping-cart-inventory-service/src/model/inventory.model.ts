
module.exports = (sequelize: any, Sequelize: any) => {
    const Inventory = sequelize.define("t_inventory", {
      idProduct: {
        type: Sequelize.STRING,
        unique: true
      },
      amount: {
        type: Sequelize.INTEGER
      },
      createdDate: {
        type: Sequelize.DATE,
        default: Date.now()
      },
      categoryProduct: {
        type: Sequelize.STRING 
      },
      branchProduct: {
        type: Sequelize.STRING 
      },
      nameProduct: {
        type: Sequelize.STRING 
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
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
    
    return Inventory
  };
  



