import { Controller } from "@nestjs/common";
import { AboutUsService } from "./aboutUs.service";

@Controller("contact")
export class AboutUsController {
    constructor(private aboutUsService: AboutUsService) {}
}