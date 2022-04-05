import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { Partner } from './partner/partner.entity';
import { PartnerService } from './partner/partner.service';

@Module({
  imports: [ContactModule, TypeOrmModule.forFeature([Customer, Partner])],
  providers: [CustomerService, PartnerService],
  controllers: [CustomerController],
  exports: [PartnerService]
})
export class CustomerModule {}
