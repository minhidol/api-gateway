const dbModel = require("../model/index");

const cartItem = dbModel.t_cart_item;
const Op = dbModel.Sequelize.Op;

export async function removeItemFromCart(input: any){
    try{
         await cartItem.update({isDelete: 1},{
            where: {
                idCart: input.idCart,
                idProduct: input.idProduct,
                isDelete: 0
            }
        })
    }catch(error){
        throw error;
    }
}

export async function getItemByCart(input: any){
    try{
        const item = await cartItem.findOne({where:{
                idCart: input.idCart,
                idProduct: input.idProduct,
                isDelete: 0
        }});
        return item;
    }catch (error) {
        throw error;
    }
}

export async function getCartItem(input: any){
    try {
        const cart = await cartItem.findAll({
            where: {
                idCart: input.idCart,
                isDelete: 0
            }
        });

        const dataString = JSON.stringify(cart, null, 2);
        const dataResult = JSON.parse(dataString);
        return dataResult;
    } catch (error) {
        throw error;
    }
}

export async function createCartItem(input: any){
    try {
        const item = await cartItem.update({quantity: input.amount},{
            where: {
                idCart: input.idCart,
                idProduct: input.idProduct,
                isDelete: 0
            }
        })
        if(item[0] == 0){
            await cartItem.create({
                idCart: input.idCart,
                idProduct: input.idProduct,
                quantity: input.amount,
                isDelete: 0
            })
        }
       
    } catch (error) {
        throw error;
    }
}