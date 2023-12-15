import * as multer from 'multer';

export default function diskStorage(
  destination = './temp',
): multer.StorageEngine {
  return multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
      const fileName = file.originalname.split('.')[0];
      const fileExt = file.originalname.split('.')[1];

      const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');

      const newName = `${Date.now()}_${randomName}.${fileExt}`;

      req.body.fileName = newName;
      req.body.originalFileName = fileName;
      cb(null, newName);
    },
  });
}
