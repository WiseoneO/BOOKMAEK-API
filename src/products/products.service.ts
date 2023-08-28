/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException } from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose'

import { Product } from "./product.model";
import { Model } from "mongoose";


@Injectable()
export class ProductService{
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>
    ){}

    async insertProduct(title: string, desc: string, price: number){

            const newProduct = new this.productModel({
                title:title, 
                description: desc,
                price: price
            });
            const result = await newProduct.save();
            return result
    }

    async getProducts(){
       const results = await this.productModel.find();

    //    remove _id and to remove the __v
       return results.map(result=>({
        id:result.id, 
        title:result.title,
        description:result.description, 
        price: result.price
            })
        );
    }

    async getProduct(productId: string){
        const product = await this.findProduct(productId);

        return product;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async updateProduct(productId: string, title:string, description:string, price: number){
        // Check if product exist
            const updateProduct = await this.findProduct(productId);

            if(title){
                updateProduct.title = title;
            }
            if(description){
                updateProduct.description = description;
            }
            if(price){
                updateProduct.price = price;
            }
            updateProduct.save();
    }

    async deleteProduct(id: string){
        await this.productModel.deleteOne({_id: id});
    }

    private async findProduct(id: string): Promise<any>{
        const product = await this.productModel.findById(id);
        if(!product){
            throw new NotFoundException('Product not found');
        }
        return product;
    }
}