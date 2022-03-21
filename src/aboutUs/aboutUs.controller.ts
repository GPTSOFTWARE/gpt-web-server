import { Controller, Get, Render } from '@nestjs/common';
import { AboutUsService } from './aboutUs.service';

@Controller('aboutus')
export class AboutUsController {
  constructor(private aboutUsService: AboutUsService) {}

  @Get()
  @Render('aboutUs/index')
  get () {
    return this.aboutUsService.get({relations: ["personnels"]})
  }
}
