import { Router } from "express";
import ProductController from "../controllers/productController.js";

const router: Router = Router();


// get all products 
router.get('/products', ProductController.getAll);


// get product by id 
router.get('/products/:id', ProductController.getProductById);
    
    
// create new product 
router.post('/products', ProductController.create);
    
// update existing product
    
router.put('/products/:id', ProductController.update);

// delete product 
    
router.delete('/products/:id', ProductController.delete);
    
    
export default router; 