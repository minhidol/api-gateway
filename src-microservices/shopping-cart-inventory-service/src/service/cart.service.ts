const dbModel = require("../model/index");
import { isKeyObject } from 'util/types';
import {createCartItem, getCartItem, getItemByCart} from './cart_item.service';

const Cart = dbModel.table_cart;
const Op = dbModel.Sequelize.Op;

export async function removeCart(input: any){
    try{
         await Cart.update({isDelete: 1},{
            where: {
                username: input.username,
                isDelete: 0
            }
        })
    }catch(error){
        throw error;
    }
}

export async function getCartByAccount(input: any) {
    try {
        const data = await Cart.findOne({
            where: {
                username: input.username,
                isDelete: 0
            }
        });
        if(data == null)
            return null;
        const listItem = await getCartItem({
            idCart: data.id
        });
        
        return {
            idCart: data.id,
            listItem: listItem
        }
    } catch (error) {
        throw error;
    }
  };

export async function createCart(input: any){
    try {
        const cart = await Cart.findOne({where: {
            username: input.username,
            isDelete: 0
        }});
        if(cart == null){
            const body = {
                username: input.username,
                isDelete: 0
            };
            const cartCreated = await Cart.create(body);
            const item_cart = {
                idCart: cartCreated.id,
                amount: input.amount,
                idProduct: input.id_product,
            }
            await createCartItem(item_cart);
        }
        else{
            const item_cart = {
                idCart: cart.id,
                amount: input.amount,
                idProduct: input.id_product
            }
            const item = await getItemByCart(item_cart);
            if(item){
                if(input.is_update == 1){
                    await createCartItem(item_cart);
                }else{
                    const amount = +item.quantity + +input.amount;
                    item_cart.amount = amount;
                    await createCartItem(item_cart);
                }
            }else{
                await createCartItem(item_cart);
            }
            
        }

    } catch (error) {
        throw error;
    }
}