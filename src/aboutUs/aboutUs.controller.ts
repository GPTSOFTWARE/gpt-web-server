import { Controller, Get, Render } from '@nestjs/common';
import { AboutUsService } from './aboutUs.service';

@Controller('aboutus')
export class AboutUsController {
  constructor(private aboutUsService: AboutUsService) {}

//   @Get()
//   async get() {
//     return await this.aboutUsService.get();
//   }
}
