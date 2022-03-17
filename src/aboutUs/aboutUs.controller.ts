import { Controller } from '@nestjs/common';
import { AboutUsService } from './aboutUs.service';

@Controller('aboutus')
export class AboutUsController {
  constructor(private aboutUsService: AboutUsService) {}
}
