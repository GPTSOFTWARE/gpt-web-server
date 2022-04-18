import { Body, Controller, Get, Post, Query, Redirect, Render, Res, UseGuards} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/common/guard/auth.guard';
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
    return {}
  }

  @Post('login')
  @Redirect('/admin/home')
  async login(@Res() res: Response, @Body() body: InputSetLogin) {
    const jwt = await this.adminService.login(body);
    res.cookie('gpt_admin', jwt);
  }
}
