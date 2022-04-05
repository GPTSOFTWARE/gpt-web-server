import { Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { InputSetCategory, InputSetProduct } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @Render('product/index')
  get() {
    return this.productService.getByCategory({ categoryId: '1' });
  }

  @Get(':categoryid')
  @Render('product/index')
  getDetail(@Param('categoryid') categoryid: string) {
    return this.productService.getByCategory({ categoryId: categoryid });
  }

  @Get(':categoryid/:productid')
  @Render('product-detail/index')
  async getDetailProduct(@Param() params) {
    return this.productService.getByCategory({
      categoryId: params.categoryid,
      productId: params.productid,
    });
  }

  @Post()
  post(@Body() body: InputSetProduct) {
    if(body.id) {
      return this.productService.update(body)
    }
    return this.productService.create(body)
  }

  @Delete()
  delete(@Body("id") id: string){
    return this.productService.delete(id);
  }

  @Post("category")
  setCategory(@Body() body: InputSetCategory) {
    return this.productService.setCategory(body)
  }

  @Delete("category")
  deleteCategory(@Body("id") id: string) {
    return this.productService.deleteCategory(id);
  }
}
