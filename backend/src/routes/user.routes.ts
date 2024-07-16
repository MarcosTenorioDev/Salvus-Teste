import { Request, Router, Response } from "express";
import { jwtValidator } from "../middlewares/auth.middlewares";
import { ProductUseCase } from "../usecases/product.usecases";
import { ProductRepositoryPrisma } from "../repositories/product.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

const router = Router()
const productRepository = new ProductRepositoryPrisma()
const userRepository = new UserRepositoryPrisma()
const productUseCase = new ProductUseCase(productRepository, userRepository)

router.get("/products", jwtValidator, async (req:Request, res:Response) =>{
    try{
        const {externalId} = req.params
        const products = await productUseCase.getAllProductsByExternalId(externalId)
        res.status(200).json(products);
    }catch(err){
        res.status(400).json(err);
    }
})


export default router