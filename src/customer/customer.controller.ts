import { Body, Controller, Delete, Get, Post, Render } from '@nestjs/common';
import { InputSetCustomer, InputSetPartner } from './customer.model';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @Render('customer/index')
  get() {
    return this.customerService.getAll();
  }

  @Post()
  post(@Body() body: InputSetCustomer){
    if(body.id) {
      return this.customerService.update(body);
    }
    return this.customerService.create(body);
  }

  @Delete()
  delete(@Body("id") id: string) {
    return this.customerService.delete(id);
  }
}
