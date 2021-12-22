import sharp from "sharp";
import { File } from "formidable";

const image2webp = async (file: File) => {
  return await sharp(file.path)
    .webp()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => ({ data, info }))
    .catch((err) => null);
};
const image2avif = async (file: File) => {
  return await sharp(file.path)
    .avif()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => ({ data, info }))
    .catch((err) => null);
};

export { image2avif, image2webp };
