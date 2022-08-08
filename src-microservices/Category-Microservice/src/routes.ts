import {Express, Request, Response} from "express";
import { createCategoryHandler, getAllCategoryHandler, getCategoryByBranchHandler, handleCheckCategoryValid,
handleGetCategoryForHomePage} from "./controller/category.controller";
import {createBranchHandler, handleGetBranch, handleCheckBranchyValid, handleCheckBranchCategoryValid} from './controller/branch.controller';


export default function(app: Express) {
  
    app.post('/create-category', createCategoryHandler);
    app.get('/get-all-category', getAllCategoryHandler);
    app.post('/check-category-valid', handleCheckCategoryValid);
    app.get('/get-all-category-for-home-page', handleGetCategoryForHomePage);
    app.post('/create-branch', createBranchHandler);
    app.get('/get-all-branch', handleGetBranch);
    app.post('/check-branch-valid', handleCheckBranchyValid);
    app.post('/check-category-branch', handleCheckBranchCategoryValid);

  

}