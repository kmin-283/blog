import { NextApiRequest, NextApiResponse } from "next";
import { mkdir, rename } from "fs";
import { IncomingForm } from "formidable";
import { v4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ImageC = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    // TODO post 데이터베이스의 내용을 조작하는 것과 더불어 파일을 조작하는것을 병렬적으로 처리하자 Promise.all()
    case "POST":
      try {
        const data = new Promise((resolve, rejects) => {
          let path: string;
          let uploadDir = "./public/images/";
          const form = new IncomingForm({
            uploadDir: ``,
            keepExtensions: true,
          });
          form.on("file", (formName, file) => {
            const uuid = v4();
            path = `/images/${uuid}.${file.name}`;
            rename(file.path, `${uploadDir}/${uuid}.${file.name}`, (error) => {
              if (error) {
                rejects("Can't rename file");
              }
            });
          });
          form.parse(req, (error, fields, files) => {
            if (error) {
              rejects("formidable parse fail");
            }
            resolve(path);
          });
        });
        const ret = await data
          .then((res) => res)
          .catch((error) => {
            throw new Error(error);
          });
        return res.status(201).json({ success: true, path: ret });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
  }
};

export default ImageC;
