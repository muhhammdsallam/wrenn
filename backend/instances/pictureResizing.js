import sharp from 'sharp';

const resizeImage = (width, height) => async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  // TODO: Handle wrong codecs
  const buffer = await sharp(req.file.buffer)
    .resize(width, height)
    .toFormat('jpeg')
    .toBuffer();
  req.file.buffer = buffer;
  next();
};

export default resizeImage;
