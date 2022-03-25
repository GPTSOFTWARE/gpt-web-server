import { Controller, Get, Param, Render } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {

    constructor(
        private productService: ProductService
    ) {}

    @Get()
    @Render("product/index")
    get() {
        return this.productService.getByCategory("1");
    }

    @Get(":categoryid")
    @Render("product/index")
    getDetail(@Param('categoryid') categoryid: string) {
        return this.productService.getByCategory(categoryid);
    }

    @Get(":categoryid/:productid")
    @Render("product-detail/index")
    async getDetailProduct(@Param() params) {
        return this.productService.getOne(params.productid, {relations: ["category"]})
    }
}