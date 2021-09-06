import connectDB from "../../../utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/post";
import fs from "fs";

connectDB();

const dbAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
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
    // case "DELETE":
    // case "UPDATE":
  }
};

export default dbAPI;
