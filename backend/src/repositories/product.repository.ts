import { prisma } from "../db/prisma-client";
import { IProduct, ProductRepository } from "../interfaces/product.interface";

class ProductRepositoryPrisma implements ProductRepository{

    async getAllProducts(): Promise<IProduct[] | []> {
        try{
            return await prisma.product.findMany({
                include:{
                    assets:true
                }
            })
        }catch(err){
            throw new Error("Não foi possível encontrar todos os produtos, por favor, entre em contato com o suporte técnico")
        }
    }

    async getProductById(id: string): Promise<IProduct | null> {
        try{
            return await prisma.product.findUnique({
                where:{id},
                include:{
                    assets:true
                }
            })
        }catch(err){
            throw new Error("Não foi possível esse produto, por favor, entre em contato com o suporte técnico")
        }
    }
}

export {ProductRepositoryPrisma}