import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerModule } from "src/customer/ customer.module";
import { PartnerModule } from "src/partner/partner.module";
import { ProductModule } from "src/product/product.module";
import { Project } from "./project.entity";
import { ProjectService } from "./project.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Project]),
        forwardRef(() => ProductModule),
        PartnerModule
    ],
    providers: [ProjectService],
    exports: [ProjectService]
})
export class ProjectModule {}