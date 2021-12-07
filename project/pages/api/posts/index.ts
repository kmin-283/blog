import { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/post";
import postSchema from "@/models/post";
import Database from "@/libs/Database";

const PostCR = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const db = new Database();
  db.connect(process.env.MONGO_URL!, "posts");
  switch (method) {
    // TODO post, delete시 데이터베이스의 내용을 조작하는 것과 더불어 파일을 조작하는것을 병렬적으로 처리하자 Promise.all()
    case "GET":
      try {
        const ret = await db.find({
          filter: {},
          modelName: "Post",
          modelSchema: postSchema,
        });
        if (!ret.success) {
          return res.status(400).json({ success: false });
        }
        return res.status(200).json({ success: true, data: ret.data });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
  }
};

export default PostCR;
