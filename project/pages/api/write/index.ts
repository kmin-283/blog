import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { getThumbnail } from "@/utils/imageUpload";
import { makeInternalLinks } from "@/utils/markdown";
import postSchema from "@/models/post";
import Database from "@/libs/Database";

const PostCR = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const db = new Database();
  db.connect(process.env.MONGO_URL!, "posts");
  switch (method) {
    // TODO post, delete시 데이터베이스의 내용을 조작하는 것과 더불어 파일을 조작하는것을 병렬적으로 처리하자 Promise.all()
    case "POST":
      try {
        const { title, tags, description, markdown } = req.body;
        const thumbnail = getThumbnail(markdown);
        const internalLinks = makeInternalLinks(markdown);
        const file = `./mds/${title.replace(/\s/g, "-")}.md`;
        const ret = await db.create({
          document: {
            title,
            tags,
            description,
            file,
            thumbnail,
            internalLinks,
          },
          modelName: "Post",
          modelSchema: postSchema,
        });
        if (!ret.success) {
          return res.status(400).json({ success: false });
        }
        fs.writeFileSync(file, markdown, "utf8");
        return res.status(201).json({ success: true });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
  }
};

export default PostCR;
