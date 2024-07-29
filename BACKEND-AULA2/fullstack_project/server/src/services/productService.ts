import { IProduct } from '../interfaces/interfaces.js';
import JsonFileReader from '../utils/jsonFileReader.js';
import { v4 as uuidv4 } from 'uuid';

const productsJsonPath: string = './src/data/products.json';

class ProductService {
  private readProductsJson(): IProduct[] | undefined {
    try {
      const data = JsonFileReader.read(productsJsonPath);
      return data;
    } catch (error) {
      throw new Error('Failed to read products from file');
    }
  }

  private writeProductsJson(products: IProduct[]): void {
    try {
        JsonFileReader.write(productsJsonPath, products);

    } catch (error) {
        throw new Error('Failed to write products to file');
    }
  }

  getAll = (): IProduct[] | undefined => {
    try {
      return this.readProductsJson();
    } catch (error) {
      throw new Error('Failed to get all products');
    }
  }

  getProductById = (productId: string): IProduct | undefined => {
    try {
      const products: IProduct[] | undefined = this.readProductsJson();
      const foundProduct = products?.find(product => product.id === productId);
      return foundProduct;
    } catch (error) {
      throw new Error('Failed to get product by ID');
    }
  } 

  create = (newProduct: IProduct): IProduct => {
    try {
        const products: IProduct[] | undefined = this.readProductsJson();
        if(!products) {
            throw new Error ('failed to read products');
        }
        newProduct.id = uuidv4();
        products?.push(newProduct);
        this.writeProductsJson(products);

        return newProduct;

    } catch (error) {
        throw new Error('Failed to create product');
    }
  }

  update = (productId: string, product: IProduct): IProduct | undefined => {
    try {
        const products = this.readProductsJson();

        if(!products) {
          throw new Error ('failed to read products');
        }

        const productIndex: number = products.findIndex(product => product.id === productId);
        if (productIndex === -1) {
          return undefined;
        }

        const productToUpdateWithId = { ...products[productIndex], ...product}; // update product
        console.log(productToUpdateWithId);
        
        products[productIndex] = productToUpdateWithId;
       
        this.writeProductsJson(products);

        return productToUpdateWithId;

    } catch (error) {
      throw new Error('Failed to update product');
    }
  }

  delete = (productId: string): IProduct | undefined => {
    try {
      const products: IProduct[] | undefined = this.readProductsJson();

      if(!products) {
        throw new Error ('failed to read products');
      }

      const productIndex: number = products.findIndex(product => product.id === productId);

      if (productIndex === -1) {
        return undefined;
      }

      const arr = products.splice(productIndex, 1);
      console.log(arr);      

      const deletedProduct = arr[0]; // delete product 

      this.writeProductsJson(products);
      console.log(deletedProduct);


      return deletedProduct;

    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }
}

export default new ProductService();

