import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AboutUsModule } from "src/aboutUs/aboutUs.module";
import { DepartmentController } from "./department.controller";
import { Department } from "./department.entity";
import { DepartmentService } from "./department.service";

@Module({
    imports: [AboutUsModule, TypeOrmModule.forFeature([Department])],
    providers: [DepartmentService],
    controllers: [DepartmentController]
})
export class DepartmentModule {}