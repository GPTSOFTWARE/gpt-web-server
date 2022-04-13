import { Body, Controller, Delete, Get, Post, Render, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InputSetAboutUs, } from './aboutUs.model';
import { AboutUsService } from './aboutUs.service';

@Controller('aboutus')
export class AboutUsController {
  constructor(private aboutUsService: AboutUsService) {}

  @Get()
  @Render('aboutUs/index')
  get() {
    return this.aboutUsService.get({
      relations: ['personnels', 'departments'],
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  post(@Body() body: InputSetAboutUs, @UploadedFile() logo: Express.Multer.File) {
    if(logo) {
      body.logo = logo;
    }
    return this.aboutUsService.update(body);
  }
}
