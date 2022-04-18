import { BadRequestException } from '@nestjs/common';
import {
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
  unlinkSync,
} from 'fs';
import { join } from 'path';
import { staticFolder } from '../utils/constant';
import * as _ from 'lodash';

export class UtilService {
  checkFormat(file: Express.Multer.File, format: string[]) {
    if (!format.includes(_.last(file.originalname.split('.')))) {
      this.clearTmp(file.path);
      throw new BadRequestException(
        `You can only upload file with format: ${format}`,
      );
    }
  }

  uploadFile(file: Express.Multer.File, folder = '', oldFile?: string) {
    const path = `${folder}/${file.filename}`;
    const readStream = createReadStream(file.path);
    if (!existsSync(join(staticFolder, folder))) {
      mkdirSync(join(staticFolder, folder));
    }

    oldFile && this.clearFile(oldFile);

    const writeSteam = createWriteStream(join(staticFolder, path));

    readStream.pipe(writeSteam);

    this.clearTmp(file.path);

    return `/${path}`;
  }

  clearTmp(tmpPath: string) {
    unlinkSync(tmpPath);
  }

  clearFile(path) {
    unlinkSync(join(staticFolder, path));
  }

  handleUploadFile(
    file: Express.Multer.File,
    folder: string,
    format?: string[],
    oldLogo?: string,
  ) {
    format && this.checkFormat(file, format);
    return this.uploadFile(file, folder, oldLogo);
  }
}
