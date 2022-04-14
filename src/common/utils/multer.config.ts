import * as multer from 'multer';

export const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const subfix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    cb(null, `${subfix}_${file.originalname}`);
  },
});
