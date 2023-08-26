/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, Param, Patch, Delete} from "@nestjs/common";
import { ProductService } from "./products.service";


@Controller('products')
export class ProductsController{
    constructor(private readonly productsService: ProductService){}

    @Post()
    addProduct(
        // @Body() completeBody: {title: string, description: string, price: number}
        @Body('title') prodTitle:string,
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number,
        ): any{
        const generatedId =  this.productsService.insertProduct(prodTitle,prodDesc,prodPrice);
        return {id: generatedId};
    }

    @Get()
    getAllproducts(): any{
        return this.productsService.getProducts();
    }

    @Get(':id')
    getOneProduct(@Param('id') prodId: string){
        return this.productsService.getProduct(prodId);
    }

    @Patch(':id')
    updateProduct( 
        @Param('id') prodId:string,
        @Body('title') prodTitle:string,
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number,
        ){
            this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
            return null;
        }

    @Delete(':id')
    deleteProduct(@Param('id') prodId: string){
        return this.productsService.deleteProduct(prodId);
        return null;
    }
}