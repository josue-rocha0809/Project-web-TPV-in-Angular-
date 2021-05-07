import { Request,Response} from 'express';
import pool from '../database'

class ProductsControllers{
    public async list(req:Request,res:Response){
     const products= await pool.query('SELECT *  FROM productos');
    res.json(products);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
      const { id }= req.params;
      const products=await pool.query('SELECT * FROM productos  WHERE id = ?',[id]);
     if(products.length>0){
       return res.json(products[0]);
     }
      res.status(404).json({text:'the product doesnt exist'})
    }

    public async create (req:Request,res:Response):Promise<void>{
      await pool.query('INSERT INTO productos set ?',[req.body])
      res.json({message:'Product saved'});
    } 
    
    public async update(req:Request,res:Response):Promise<void>{
      const {id}=req.params;
      await pool.query('UPDATE productos set ? WHERE id= ?',[req.body, id]);
      res.json({message:'the product was updated'})
    
    }
    public  async delete(req:Request,res:Response){
     const {id}= req.params;
     await pool.query('DELETE FROM productos WHERE id = ?',[id]);
     res.json({message:'the game was deleted'});
    }

}

const productController = new ProductsControllers();
export default productController;