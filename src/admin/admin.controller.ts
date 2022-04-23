import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { InputSetAboutUs } from 'src/aboutUs/aboutUs.model';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { InputSetCustomer } from 'src/customer/customer.model';
import { InputSetHome } from 'src/home/home.model';
import { InputSetPartner } from 'src/partner/partner.model';
import { InputGetRequest, InputSetProduct } from 'src/product/product.model';
import { InputSetProject } from 'src/project/project.model';
import { InputSetLogin } from './admin.model';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  @Render('admin/login/index')
  get(@Query('error') error: string) {
    if (error) {
      return { message: error };
    }
    return { message: null };
  }

  @Get('blog')
  @UseGuards(AuthGuard)
  @Render('admin/blog/index')
  getBlog() {
    return {};
  }

  @Get('home')
  @UseGuards(AuthGuard)
  @Render('admin/home/index')
  getHome() {
    return this.adminService.getAdminHome();
  }

  @Get('aboutus')
  @UseGuards(AuthGuard)
  @Render('admin/aboutUs/index')
  getAboutUs() {
    return this.adminService.getAdminAboutUs();
  }

  // Product

  @Get('product')
  @UseGuards(AuthGuard)
  @Render('admin/product/index')
  getProduct(@Query() { productID, page }) {
    if (productID || page) {
      return this.adminService.getProduct({ productID }, page);
    }
    return this.adminService.getProduct();
  }

  @Get('product/edit')
  @UseGuards(AuthGuard)
  @Render('admin/productDetail/index')
  getProject(@Query() query: InputGetRequest) {
    return this.adminService.getProject(query);
  }

  @Get('product/add')
  @UseGuards(AuthGuard)
  @Render('admin/product/addNewProduct/index')
  getAddNewProduct() {
    return this.adminService.getProducts();
  }

  // Category

  @Get('category')
  @UseGuards(AuthGuard)
  @Render('admin/category/index')
  getCategory(@Query('page') page: string) {
    return this.adminService.getProducts(page);
  }

  @Get('category/edit')
  @UseGuards(AuthGuard)
  @Render('admin/category/edit/index')
  async getEditCategory(@Query('id') id: string) {
    return { category: await this.adminService.getCategory(id) };
  }

  @Get('category/add')
  @UseGuards(AuthGuard)
  @Render('admin/category/add/index')
  getAddCategory() {}

// Customer

  @Get('customer')
  @UseGuards(AuthGuard)
  @Render('admin/customer/index')
  getCustomer(@Query('page') page: string) {
    return this.adminService.getCustomer(page);
  }

  @Get('customer/edit')
  @UseGuards(AuthGuard)
  @Render('admin/customer/edit/index')
  async getEditCutsomer(@Query('id') id: string) {
    return { customer: await this.adminService.getDetailCustomer(id) };
  }

  @Get('customer/add')
  @UseGuards(AuthGuard)
  @Render('admin/customer/add/index')
  async getAddCustomer() {
    return {};
  }

// Partner

  @Get("partner")
  @UseGuards(AuthGuard)
  @Render("admin/partner/index")
  getPartner(@Query("page") page: string) {
    return this.adminService.getPartner(page);  
  }

  @Get("partner/edit")
  @UseGuards(AuthGuard)
  @Render("admin/partner/edit/index")
  getEditPartner(@Query("id") id: string) {
    return this.adminService.getDetailPartner(id)
  }

  @Get("partner/add")
  @UseGuards(AuthGuard)
  @Render("admin/partner/add/index")
  async getAddPartner() {
    return {customers: await this.adminService.getAddPartner()};
  }

  // POST

  @Post('home')
  @UseGuards(AuthGuard)
  @Redirect('/admin/home')
  postHome(@Body() body: InputSetHome) {
    return this.adminService.setHome(body);
  }

  @Post('aboutus')
  @UseGuards(AuthGuard)
  @Redirect('/admin/aboutus')
  postAboutUs(@Body() body: InputSetAboutUs) {
    return this.adminService.setAboutUs(body);
  }

  @Post('product/project')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async postProject(
    @Body() body: InputSetProject,
    @Res() res: Response,
    @UploadedFile() banner: Express.Multer.File,
  ) {
    if (banner) {
      body.banner = banner;
    }
    const project = await this.adminService.setProject(body);
    res.redirect(
      `/admin/product/edit?productID=${project.product.id}&projectID=${project.id}`,
    );
    return project;
  }

  @Post('category')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async postCategory(
    @Body() body: InputSetProduct,
    @Res() res: Response,
    @UploadedFile() banner: Express.Multer.File,
  ) {
    if (banner) {
      body.banner = banner;
    }
    const category = await this.adminService.setCategory(body);
    res.redirect(`/admin/category/edit?id=${category.id}`);
    return category;
  }

  @Post('customer')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async postCustomer(
    @Body() body: InputSetCustomer,
    @Res() res: Response,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    if (logo) body.logo = logo;
    const customer = await this.adminService.setCustomer(body);
    res.redirect(`/admin/customer/edit?id=${customer.id}`);
    return customer;
  }

  @Post("partner")
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async postPartner(
    @Body() body: InputSetPartner,
    @Res() res: Response,
    @UploadedFile() logo: Express.Multer.File,
  ){
    if(logo) body.logo = logo;
    const partner = await this.adminService.setPartner(body);
    res.redirect(`/admin/partner/edit?id=${partner.id}`);
    return partner
  }
  @Delete('product/:projectID')
  @Redirect('/admin/product')
  deleteProject(@Param('projectID') projectID: string) {
    return this.adminService.deleteProject(projectID);
  }

  @Delete('category/:id')
  @Redirect('/admin/category')
  deleteCategory(@Param('id') id: string) {
    return this.adminService.deleteCategory(id);
  }

  @Delete('customer/:id')
  @Redirect('/admin/customer')
  deleteCustomer(@Param('id') id: string) {
    return this.adminService.deleteCustomer(id);
  }

  @Delete('partner/:id')
  @Redirect('/admin/partner')
  deletePartner(@Param('id') id: string){
    return this.adminService.deletePartner(id);
  }

  @Post('login')
  @Redirect('/admin/home')
  async login(@Res() res: Response, @Body() body: InputSetLogin) {
    const jwt = await this.adminService.login(body);
    res.cookie('gpt_admin', jwt);
  }
}
