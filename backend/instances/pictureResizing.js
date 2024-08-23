import sharp from 'sharp';
import AppError from '../utils/AppError.js';

const resizeImage = (width, height) => async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const buffer = await sharp(req.file.buffer)
    .resize(width, height)
    .toFormat('jpg')
    .toBuffer();

  // const metadata = await buffer.metadata();

  // const minWidth = parseInt(process.env.IMAGE_MIN_WIDTH, 10) || 100;
  // const minHeight = parseInt(process.env.IMAGE_MIN_HEIGHT, 10) || 100;

  // if (metadata.width < minWidth || metadata.height < minHeight) {
  //   throw new AppError(
  //     `Image dimensions must be at least ${minWidth}x${minHeight}`,
  //     400
  //   );
  // }

  req.file.buffer = buffer;
  next();
};

export default resizeImage;
