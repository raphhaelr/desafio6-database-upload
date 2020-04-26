import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const csvFolder = path.resolve(__dirname, '..', '..', 'csv');

export default {
  directory: csvFolder,
  storage: multer.diskStorage({
    destination: csvFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(8).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
