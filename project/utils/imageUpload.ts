import aws from "aws-sdk";
import { createReadStream } from "fs";
import { v4 } from "uuid";
import { File, Files } from "formidable";

const getThumbnail = (markdown: string) => {
  const thumbnailTag = markdown.match(/!\[[^()[\]]*\]\([^)]+\)/)![0];
  const thumbnail = thumbnailTag.match(/\([^\s]*\)?/)![0];
  return thumbnail[thumbnail.length - 1] !== ")"
    ? thumbnail.slice(1)
    : thumbnail.slice(1, -1);
};

const uploadToS3 = async (files: Files) => {
  const region = "ap-northeast-2";
  const bucket = process.env.AWS_S3_BUCKET_NAME!;
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_KEY;

  aws.config.update({
    region,
    accessKeyId,
    secretAccessKey,
  });

  const key = v4();
  const file = files.file as File;
  const upload = new aws.S3.ManagedUpload({
    params: {
      Bucket: bucket,
      Key: key,
      Body: createReadStream(file.path),
      ACL: "public-read",
    },
  });
  return await upload.promise();
};

export { getThumbnail, uploadToS3 };
