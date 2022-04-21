import { Body, Controller, Get, Post, Query, Redirect, Render, Res, UseGuards} from '@nestjs/common';
import { Response } from 'express';
import { InputSetAboutUs } from 'src/aboutUs/aboutUs.model';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { InputSetHome } from 'src/home/home.model';
import { InputSetLogin } from './admin.model';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  @Render('admin/login/index')
  get(@Query("error") error: string) {
    if(error) {
      return {message: error};
    }
    return {message: null}
  }

  @Get("home")
  @UseGuards(AuthGuard)
  @Render("admin/home/index")
  getHome() {
    return this.adminService.getAdminHome();
  }

  @Get("aboutus")
  @UseGuards(AuthGuard)
  @Render("admin/aboutUs/index")
  getAboutUs() {
    return this.adminService.getAdminAboutUs();
  }

  @Post("home")
  @UseGuards(AuthGuard)
  @Redirect("/admin/home")
  postHome(@Body() body: InputSetHome) {
    return this.adminService.setHome(body);
  }

  @Post("aboutus")
  @UseGuards(AuthGuard)
  @Redirect("/admin/aboutus")
  postAboutUs(@Body() body: InputSetAboutUs) {
    return this.adminService.setAboutUs(body);
  }

  @Get("blog")
  @UseGuards(AuthGuard)
  @Render("admin/blog/index")
  getBlog() {
    return {}
  }

  @Post('login')
  @Redirect('/admin/home')
  async login(@Res() res: Response, @Body() body: InputSetLogin) {
    const jwt = await this.adminService.login(body);
    res.cookie('gpt_admin', jwt);
  }
}
