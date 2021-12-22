import aws from "aws-sdk";
import { createReadStream } from "fs";
import { File, Files } from "formidable";
import { image2avif, image2webp } from "@/utils/imageConvert";

const getThumbnail = (markdown: string) => {
  const thumbnailTag = markdown.match(/!\[[^()[\]]*\]\([^)]+\)/)![0];
  const thumbnail = thumbnailTag.match(/\([^\s]*\)?/)![0];

  return thumbnail[thumbnail.length - 1] !== ")"
    ? thumbnail.slice(1)
    : thumbnail.slice(1, -1);
};

const backgroundUpload = async ({
  type,
  bucket,
  directory,
  uploadDate,
  uploadName,
  file,
  callback,
}: {
  type: string;
  bucket: string;
  directory: string;
  uploadDate: string;
  uploadName: string;
  file: File;
  callback: (file: File) => Promise<{ data: Buffer; info: object } | null>;
}) => {
  const processedImage = await callback(file);
  const managedUpload = new aws.S3.ManagedUpload({
    params: {
      Bucket: bucket,
      Key: `${directory}/${uploadDate}/${uploadName}.${type}`,
      Body: processedImage?.data,
      ACL: "public-read",
    },
  });
  return await managedUpload.promise();
};

const uploadToS3 = async (directory: string, files: Files) => {
  const region = "ap-northeast-2";
  const bucket = process.env.AWS_S3_BUCKET_NAME!;
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_KEY;

  aws.config.update({
    region,
    accessKeyId,
    secretAccessKey,
  });

  const file = files.file as File;
  const today = new Date();
  const uploadDate = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${
    today.getUTCDate() + 1
  }`;

  if (file.name) {
    const uploadName = file.name.slice(0, file.name.indexOf("."));
    const processedImage = Promise.all([
      backgroundUpload({
        type: "webp",
        bucket,
        directory,
        uploadDate,
        uploadName,
        file,
        callback: image2webp,
      }),
      backgroundUpload({
        type: "avif",
        bucket,
        directory,
        uploadDate,
        uploadName,
        file,
        callback: image2avif,
      }),
    ]);

    const upload = new aws.S3.ManagedUpload({
      params: {
        Bucket: bucket,
        Key: `${directory}/${uploadDate}/${file.name}`,
        Body: createReadStream(file.path),
        ACL: "public-read",
      },
    });
    return await upload.promise();
  }
};

export { getThumbnail, uploadToS3 };
