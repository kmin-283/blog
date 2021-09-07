import connectDB from "../../../utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/post";
import fs from "fs";

connectDB();

const dbAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    // TODO post, delete시 데이터베이스의 내용을 조작하는 것과 더불어 파일을 조작하는것을 병렬적으로 처리하자 Promise.all()
    case "GET":
      try {
        const posts = await Post.find({});
        return res.status(200).json({ success: true, data: posts });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    case "POST":
      try {
        const { title, tags, markdown } = req.body;
        const post = await Post.create({
          title,
          tags,
          file: `./mds/${title}.md`,
        });
        fs.writeFileSync(`./mds/${title}.md`, markdown, "utf8");
        return res.status(201).json({ success: true, data: post });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    case "DELETE":
      try {
        const { _id, title } = req.body;
        await fs.unlink(`./mds/${title}.md`, (error) => {
          if (error) {
            throw new Error("Can't delete file");
          }
        });
        const response = await Post.deleteOne({ _id });
        if (response.deletedCount === 1) {
          const posts = await Post.find({});
          return res.status(200).json({ success: true, data: posts });
        } else {
          return res.status(400).json({ success: false });
        }
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    // case "PUT":
  }
};

export default dbAPI;
