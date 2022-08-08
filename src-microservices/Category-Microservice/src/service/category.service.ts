import {DocumentDefinition, FilterQuery} from 'mongoose';
import Category, {CategoryDocument} from '../model/category.model';
import request from 'request';

export async function createCreateBranch(input: any){
    try {
        return await Category.create(input);
    } catch (error) {
        throw error;
    }
}

export async function findCategoryByName(input: any){
    try {
        return await Category.findOne(input);
    } catch (error) {
        throw error;
    }
}

export async function createCategory(input: any){
    try {
        const checkCategory = await findCategoryByName({
            name: input.category,
            is_delete: false
        });
        if(checkCategory){
            const listCategoryDetail = checkCategory.category_detail;
            if(!listCategoryDetail.includes(input.category_detail) && input.category_detail != ''){
                 await Category.updateOne({
                    name: input.category,
                    is_delete: false
                }, {
                        $push: {
                            category_detail: input.category_detail
                        }
                });
            }
           
        }else{
            if(input.category_detail == ''){
                await Category.create({
                    name: input.category,
                    categoryDetail: []
                });
            }else{
                await Category.create({
                    name: input.category,
                    category_detail: [input.category_detail]
                });
            }
            
        }
        return true;
    } catch (error) {
        throw error;
    }
}

export async function getCategory(){
    try {
        return  await Category.find({is_delete: false}).select({
            is_delete: 0
        });
    } catch (error) {
        throw error;
    }
}

function doRequest(url: any, body: any) {
    return new Promise(function (resolve, reject) {
      request(url, body, function (error: any, res: any, response: string) {
        if (!error && res.statusCode == 200) {
          resolve(response);
        } else {
          reject(error);
        }
      });
    });
  }

export async function getCategoryByCountProduct(){
    try {
        const listCategory = await getCategory();
        const listCategoryPost : Array<String> = [];
        for(let i = 0; i < listCategory.length; i++){
            listCategoryPost.push(listCategory[i].name);
        }
        const dataPost = {
            list_category: listCategoryPost
        };
        const optionPost = {
            method: 'GET',
            body: dataPost,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };
        let result: any = {};
        result = await doRequest('http://api-gateway:3333/product/get-count-product-by-category', optionPost);
        const listResult = result.ResponseResult.Result;
        const listResultFinal : Array<Object> = [];
        for(let i = 0; i < listResult.length; i++){
            listResultFinal.push({
                category: listResult[i].category,
                countProduct: listResult[i].countProduct,
                linkUrl: 'http://api-gateway:3333/category/upload/Iqoo-8-Pro-1-1.jpg'
            })
        }
        return listResultFinal;
    } catch (error) {
        throw error;
    }
}

export async function getCategoryByBranch(input: FilterQuery<CategoryDocument>){
    try {
        const query = {...input};
        input.is_delete = false;
        return await Category.find(query).select({
            is_delete: 0
        });
    } catch (error) {
        throw error;
    }
}

export async function checkCategoryValid(input: any){
    try {
        const query = {
            name: input.category,
            is_delete: false
        }; 
        const checkCategory = await findCategoryByName(query);
        
        if(checkCategory){
            const listCategoryDetail = checkCategory.category_detail;
            if(input.category_detail != ''){
                if(listCategoryDetail.includes(input.category_detail))
                    return true
                else
                    return false
            }
            return true
        }else{
            return false;
        }

    } catch (error) {
        throw error;
    }
}

