import { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/post";
import { unlink } from "fs";
import postSchema from "@/models/post";
import Database from "@/libs/Database";

const PostD = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;
  const db = new Database();
  db.connect(process.env.MONGO_URL!, "posts");
  switch (method) {
    case "DELETE":
      try {
        const { title } = req.body;
        await unlink(`./mds/${title}.md`, (error) => {
          if (error) {
            throw new Error("Can't delete file");
          }
        });
        const ret = await db.deleteOne({
          filter: {
            _id: id,
          },
          modelName: "Post",
          modelSchema: postSchema,
        });

        if (!ret.success) {
          return res.status(400).json({ success: false });
        }
        const posts = await db.find({
          filter: {},
          modelName: "Post",
          modelSchema: postSchema,
        });
        if (!posts.success) {
          return res.status(400).json({ success: false });
        }
        return res.status(200).json({ success: true, data: posts.data });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
  }
};

export default PostD;
