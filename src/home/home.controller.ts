import { Controller, Get, Render } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller(['', 'home'])
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get()
  // @Render('index')
  async get() {
    return await this.homeService.get();
  }
}
