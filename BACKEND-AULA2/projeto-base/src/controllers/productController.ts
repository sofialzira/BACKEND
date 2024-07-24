import { Request, Response } from "express";
import { IProduct } from "../interfaces/interfaces.js";
import productService from "../services/productService.js";

const productsFilePath = './src/data/products.json';

class ProductController {
  
    getAll = async (req: Request, res: Response) => {
        try {
            const products: IProduct[] | undefined = await productService.getAll();

            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'failed to get product' });
        }
    }

    getProductById = async (req: Request, res: Response) => {
        try {
            const productId: string = req.params.id;
            const product: IProduct | undefined = productService.getProductById(productId);

            if(!product) {
                res.status(404).json({error: 'product not found'});
            }

            res.json(product);

        } catch (error) {
            res.status(500).json({ error: 'failed to get product' });
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const productToCreate: IProduct = req.body;
            const createProduct: any = productService.create(productToCreate);
            res.status(201).json(createProduct)

        } catch (error) {
            res.status(500).json({ error: 'failed to create product' });
        }
    }

    update = async (req: Request, res: Response) => {
        try {

        } catch (error) {
            res.status(500).json({ error: 'failed to update product' });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {

        } catch (error) {
            res.status(500).json({ error: 'failed to delete product' });
        }
    }
}

export default new ProductController();

