import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import { uploadToS3 } from "@/utils/imageUpload";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ImageC = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const data = new Promise((resolve, reject) => {
          const form = new IncomingForm({
            uploadDir: ``,
            keepExtensions: true,
          });
          form.parse(req, async (error, fields, files) => {
            if (error) {
              reject(error);
            }
            resolve(await uploadToS3("images", files));
          });
        });
        const uploadData = await data
          .then((data) => data)
          .catch((error) => {
            throw new Error(error);
          });
        return res.status(201).json({ success: true, data: uploadData });
      } catch (error) {
        return res.status(400).json({ success: false, data: error });
      }
  }
};

export default ImageC;
