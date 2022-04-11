import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerModule } from "src/customer/ customer.module";
import { CustomerService } from "src/customer/customer.service";
import { Partner } from "./partner.entity";
import { PartnerService } from "./partner.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Partner]), 
        CustomerModule
    ],
    providers: [PartnerService],
    exports: [PartnerService]
})
export class PartnerModule {}