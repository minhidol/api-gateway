import {DocumentDefinition, FilterQuery} from 'mongoose';
import Branch, {BranchDocument} from '../model/branch.model';
import {checkCategoryValid, createCreateBranch} from './category.service';


export async function checkBranchCategoryValid(input: any){
    try {
        const checkCategory = await checkCategoryValid(input);
        const checkBranch = await checkBranchValid(input);
        if(checkCategory == false || checkBranch == false)
            return false;
        return true;
    } catch (error) {
        throw error;
    }
}

export async function findBranchByName(input: any){
    try {
        return await Branch.findOne(input);
    } catch (error) {
        throw error;
    }
}

export async function createBranch(input: any){
    try {
        const checkBranch = await findBranchByName({
            name: input.branch,
            is_delete: false
        });
        if(checkBranch){
            const listCategory = checkBranch.category;
            if(!listCategory.includes(input.category)){
                 await Branch.updateOne({
                    name: input.branch,
                    is_delete: false
                }, {
                        $push: {
                            category: input.category
                        }
                });
            }
           
        }else{   
            await Branch.create({
                name: input.branch,
                category: [input.category]
            });
        }
        await createCreateBranch({
            name: input.category
        });
        return true;
    } catch (error) {
        throw error;
    }
}

export async function getBranch(input: DocumentDefinition<BranchDocument>){
    try {
        return  await Branch.find({is_delete: false}).select({
            is_delete: 0
        });
    } catch (error) {
        throw error;
    }
}

export async function checkBranchValid(input: any){
    try {
        const query = {
            name: input.branch,
            is_delete: false
        }; 
        const checkBranch = await findBranchByName(query);
        
        if(checkBranch){
            const listCategory = checkBranch.category;
            if(input.category != ''){
                if(listCategory.includes(input.category))
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



