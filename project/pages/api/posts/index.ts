import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/utils/mongodb";
import Post from "@/models/post";

connectDB().then();

const PostCR = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    // TODO post, delete시 데이터베이스의 내용을 조작하는 것과 더불어 파일을 조작하는것을 병렬적으로 처리하자 Promise.all()
    case "GET":
      try {
        const posts = await Post.find({});
        return res.status(200).json({ success: true, data: posts });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
  }
};

export default PostCR;
