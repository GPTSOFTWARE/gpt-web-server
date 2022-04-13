import { BadRequestException } from "@nestjs/common";
import { createReadStream, createWriteStream, existsSync, mkdir, mkdirSync, unlinkSync } from "fs";
import { join } from "path";
import { staticFolder } from "../utils/constant";

export class UtilService {

    checkFormat(file: Express.Multer.File, format: string[]) {
        if(!format.includes(file.originalname.split(".")[0])) {
            this.clearTmp(file.path)
            throw new BadRequestException(`You can only upload file with format: ${format}`)
        }
    }

    uploadFile(file: Express.Multer.File, oldFile: string, folder: string = "") {
        const path = `${folder}/${file.filename}`
        const readStream = createReadStream(file.path)
        if(!existsSync(join(staticFolder, folder))) {
            mkdirSync(join(staticFolder, folder))
        }
        
        if(oldFile) {
            unlinkSync(join(staticFolder, oldFile));
        }

        const writeSteam = createWriteStream(join(staticFolder, path));
        
        readStream.pipe(writeSteam)

        this.clearTmp(file.path)

        return `/${path}`
    }

    clearTmp(tmpPath: string) {
        unlinkSync(tmpPath);
    }
}