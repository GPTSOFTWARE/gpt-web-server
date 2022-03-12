import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get()
  @Render('index')
  get() {
    return { message: 'hello' };
  }
}
