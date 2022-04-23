import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { InputSetAboutUs } from 'src/aboutUs/aboutUs.model';
import { AboutUsService } from 'src/aboutUs/aboutUs.service';
import { BaseService } from 'src/common/services/base.service';
import { CacheService } from 'src/common/services/cache.service';
import { TokenService } from 'src/common/services/token.service';
import { InputSetCustomer } from 'src/customer/customer.model';
import { CustomerService } from 'src/customer/customer.service';
import { InputSetHome } from 'src/home/home.model';
import { HomeService } from 'src/home/home.service';
import { InputGetRequest, InputSetProduct } from 'src/product/product.model';
import { ProductService } from 'src/product/product.service';
import { InputSetProject } from 'src/project/project.model';
import { ProjectService } from 'src/project/project.service';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { InputSetLogin } from './admin.model';

@Injectable()
export class AdminService extends BaseService<Admin> {
  private bcrypt;
  constructor(
    @InjectRepository(Admin) repo: Repository<Admin>,
    private tokenService: TokenService,
    private cacheService: CacheService,
    private homeService: HomeService,
    private aboutUsService: AboutUsService,
    private productService: ProductService,
    private projectService: ProjectService,
    private customerService: CustomerService
  ) {
    super(repo);
    this.bcrypt = bcrypt;
  }

  getAdminHome() {
    return this.homeService.get()
  }

  setHome(input: InputSetHome) {
    return this.homeService.update(input)
  }

  getAdminAboutUs() {
    return this.aboutUsService.get()
  }

  setAboutUs(input: InputSetAboutUs) {
    return this.aboutUsService.update(input);
  }

  async getProduct(input?: InputGetRequest, page?: string) {
    let data;
    if(input) {
      data = await this.productService.getRequest(input)
    }else {
      data = await this.productService.getRequest()
    }

    if(page) {
      return {...data, start: parseInt(page) * 4}
    }
    
    return {...data, start: 0}
  }

  async getProducts(page?: string) {
    const products = await this.productService.getAll();
    if(page) {
      return {products, start: parseInt(page) * 5 }
    }

    return {products, start: 0}
  }

  async getCategory(id: string) {
    return this.productService.getOne(id)
  }

  setCategory(input: InputSetProduct) {
    if(input.id){
      return this.productService.update(input)
    }
    return this.productService.create(input)
  }

  deleteCategory(id: string) {
    return this.productService.delete(id);
  }

  getProject(input: InputGetRequest) {
    return this.productService.getRequest(input);
    
  }

  setProject(input: InputSetProject) {
    if(input.id) {
      return this.projectService.update(input);
    }
    return this.projectService.create(input);
  }

  deleteProject(id: string) {
    return this.projectService.delete(id);
  }

  async getCustomer(page?: string) {
    const customers = await this.customerService.getAll();
    if(page) {
      return {customers, start: parseInt(page) * 4}
    }

    return {customers, start: 0}
  }

  getDetailCustomer(id: string) {
    return this.customerService.get(id)
  }

  setCustomer(input: InputSetCustomer) {
    if(input.id) {
      return this.customerService.update(input)
    }
    return this.customerService.create(input)
  }

  deleteCustomer(id: string) {
    return this.customerService.delete(id)
  }

  async login(input: InputSetLogin) {
    const admin = await this.repo.findOne({ username: input.username });

    if (!admin) {
      throw new UnauthorizedException('Your username is incorrect!!');
    }
    if (!(await this.bcrypt.compare(input.password, admin.password))) {
      throw new UnauthorizedException('Your password is incorrect');
    }

    const jwt = this.tokenService.sign({...admin});
    await this.cacheService.setValue<string>(input.username, jwt, { ttl: 86400 })

    return jwt;
  }

  async isExist(input: Admin){
    return !!(await this.findById(input.id));
  }
}
