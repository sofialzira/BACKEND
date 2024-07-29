import { Router } from "express";
import ProductController from "../controllers/productController.js";
import { check } from 'express-validator';
import { ExpressValidator } from "express-validator";

const router: Router = Router();

const validateProduct = [
    check("name").notEmpty().withMessage("Product name is required"),
    check("description").notEmpty().withMessage("Product description is required"),
    check("price").isNumeric().withMessage("Product price must be a number"),
    check("ean").optional().isLength({ min: 13, max:13 }).withMessage("EAN must be 13 digits")

];


// get all products 
router.get('/products', ProductController.getAll);


// get product by id 
router.get('/products/:id', ProductController.getProductById);
    
    
// create new product 
router.post('/products', validateProduct, ProductController.create);
    
// update existing product
    
router.put('/products/:id', ProductController.update);

// delete product 
    
router.delete('/products/:id', ProductController.delete);
    
    
export default router; 