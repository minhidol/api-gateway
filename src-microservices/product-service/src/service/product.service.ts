import {DocumentDefinition, FilterQuery} from 'mongoose';
import Product, {ProductDocument} from '../model/product.model';
const dotenv = require('dotenv');
import request from 'request';
dotenv.config();
const port = process.env.NODE_DOCKER_PORT;

export async function createProduct(input: DocumentDefinition<ProductDocument>){
    try {
        return await Product.create(input);
    } catch (error) {
        throw error;
    }
}

export async function removeProduct(){
  try {
      return await Product.remove({});
  } catch (error) {
      throw error;
  }
}

function doRequest(url: any) {
    return new Promise(function (resolve, reject) {
      request(url, function (error: any, res: any, body: string) {
        if (!error && res.statusCode == 200) {
            const res = JSON.parse(body);
          resolve(res);
        } else {
          reject(error);
        }
      });
    });
  }

export async function getAllProductForCart(){
  try {
    const listProduct = await Product.find({is_delete: false}).select({
      isDelete: 0
  });
  return listProduct;
  } catch (error) {
    throw error;
  }
}

export async function getAllProduct(jsonUser: any){
    try {
        const listProduct = await Product.find({is_delete: false}).select({
            isDelete: 0
        });
        
        return listProduct;
    
    } catch (error) {
        throw error;
    }
}

export async function getCountListProductByCategory(input: any){
  try {
    const listCategory = input.list_category;
    const count = listCategory.length;
    const listProductByCategory : Array<Object> = [];
    for(let i = 0; i < count; i++){
      const listProduct = await Product.find({is_delete: false, category: listCategory[i]}).select({
          isDelete: 0
      });
      listProductByCategory.push({
        category: listCategory[i],
        countProduct: listProduct.length
      });
    }
    return listProductByCategory;
  } catch (error) {
    throw error;
  }
}

