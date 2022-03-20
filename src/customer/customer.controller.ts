import { Controller, Get, Render } from "@nestjs/common";
import { CustomerService } from "./customer.service";

@Controller("customer")
export class CustomerController {
    constructor(private customerService: CustomerService){}

    @Get()
    @Render("customer/index")
    get() {
        return this.customerService.get()
    }
}