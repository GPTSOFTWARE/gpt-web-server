import { Body, Controller, Get, Put, Redirect, Render } from '@nestjs/common';
import { HomeSetInput } from './home.model';
import { HomeService } from './home.service';

@Controller(['', 'home'])
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get()
  @Render('home/index')
  async get() {
    return this.homeService.get();
  }

  @Put()
  async put(@Body() body: HomeSetInput) {
    return this.homeService.update(body)
  }
}
