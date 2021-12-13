import { NextApiRequest, NextApiResponse } from "next";
import Post, { IPost } from "@/models/post";
import { readFileSync, renameSync, writeFileSync } from "fs";
import { getThumbnail } from "@/utils/imageUpload";
import { makeInternalLinks } from "@/utils/markdown";
import postSchema from "@/models/post";
import Database from "@/libs/Database";

interface PostData {
  prevTitle: string;
  title: string;
  tags: string;
  description: string;
  markdown: string;
}

interface PostRequest<T> extends NextApiRequest {
  body: T;
}

const PostU = async (req: PostRequest<PostData>, res: NextApiResponse) => {
  const {
    query: { id: _id },
    method,
  } = req;
  const id = _id as string;
  const db = new Database();
  db.connect(process.env.MONGO_URL!, "posts");
  switch (method) {
    case "GET":
      try {
        const post = await db.findById<IPost>({
          id,
          modelName: "Post",
          modelSchema: postSchema,
        });

        if (!post.success) {
          return res.status(400).json({ success: false });
        }
        const { title, tags, description, file } = post.data as IPost;
        const markdown = readFileSync(file, "utf8");
        return res.status(200).json({
          success: true,
          data: { title, tags, description, markdown },
        });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    case "PUT":
      try {
        const { prevTitle, title, tags, description, markdown } = req.body;
        const thumbnail = getThumbnail(markdown);
        const internalLinks = makeInternalLinks(markdown);
        const file = `./mds/${title.replace(/\s/g, "-")}.md`;
        const post = await db.findByIdAndUpdate({
          id,
          update: {
            title,
            tags,
            file,
            description,
            thumbnail,
            internalLinks,
          },
          modelName: "Post",
          modelSchema: postSchema,
        });
        if (!post.success) {
          return res
            .status(400)
            .json({ success: false, error: "Post doesn't exist" });
        }
        renameSync(`./mds/${prevTitle.replace(/\s/g, "-")}.md`, file);
        writeFileSync(file, markdown);
        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
  }
};

export default PostU;
