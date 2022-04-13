import { createReadStream, createWriteStream, existsSync, mkdir, mkdirSync, unlinkSync } from "fs";
import { join } from "path";
import { staticFolder } from "../utils/constant";

export class UtilService {
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
        
        readStream.on("data", (chunk) => {
            writeSteam.write(chunk)
        })

        unlinkSync(file.path);

        return `/${path}`
    }
}