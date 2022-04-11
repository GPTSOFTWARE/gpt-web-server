import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { PartnerModule } from 'src/partner/partner.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    ContactModule,
    forwardRef(() => PartnerModule)
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService]
})
export class CustomerModule {}
