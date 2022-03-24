import { Controller, Get, Param, Render } from "@nestjs/common";
import { CategoryService } from "src/product/category/category.service";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {

    constructor(
        private categoryService: CategoryService,
        private productService: ProductService
    ) {}

    @Get()
    @Render("product/index")
    get() {
        return this.categoryService.getOne("1", {relations: ["products"]})
    }

    @Get(":category")
    @Render("product/index")
    getDetail(@Param('category') category: string) {
        return this.categoryService.getOne(category, {relations: ["products"]});
    }

    @Get(":category/:productname")
    @Render("product-detail/index")
    async getDetailProduct(@Param() params) {
        const [product, categories] = await Promise.all([
            this.productService.getOne(params.productname),
            this.categoryService.getAll()
        ])
        return {...product, categories, index: parseInt(params.category)};
    }
}