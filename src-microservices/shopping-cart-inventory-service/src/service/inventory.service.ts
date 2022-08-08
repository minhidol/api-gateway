const dbModel = require("../model/index");
const {removeCart} = require('./cart.service')
const Inventory = dbModel.t_inventories;
const Op = dbModel.Sequelize.Op;



export async function checkInventory(body: any){
    try {
        const arrData = [];
        const listItem = body.list_item;
        let count = 0;
        for(let i = 0; i < listItem.length; i++){
        const inventory = await Inventory.findOne({where: {
            idProduct: listItem[i].id
        }})
            // const data = JSON.stringify(inventory, null, 2);
            console.log('---------------------------------')
            console.log('inventory: ', inventory);
            console.log('-------------------------')
            if(inventory != null){
                //console.log('id inventory: ', listItem[i].id)
                //console.log('id item: ', inventory.idProduct)
                if(listItem[i].quantityCart > inventory.amount){
                  
                    arrData.push(listItem[i].name);
                    count++;
                }
            }
        }
       return arrData;
        
        
    } catch (error) {
        throw error;
    }
}

export async function findAll() {
    try {
        const data = await Inventory.findAll();
        const dataString = JSON.stringify(data, null, 2);
        const dataResult = JSON.parse(dataString);
        return  dataResult;
    } catch (error) {
        throw error;
    }
  };

export async function createInventory(input: any){
    try {
        const body = {
            idProduct: input.id_product,
            amount: input.amount,
            categoryProduct: input.category_product,
            branchProduct: input.branch_product,
            nameProduct: input.name_product
        };
        await Inventory.create(body);
    } catch (error) {
        throw error;
    }
}

export async function updateInventory(input: any){
    try {
        
        for(let i = 0; i < input.list_item.length; i++){

            const inventory = await Inventory.findOne({where: {
                idProduct: input.list_item[i].id
            }})
            const amount = inventory.amount;
            const rest = amount - input.list_item[i].quantityCart;
            await Inventory.update({amount: rest},{
                where: {
                    idProduct: input.list_item[i].id
                }
            })
            await removeCart(input);
        }
    } catch (error) {
        throw error;
    }
}