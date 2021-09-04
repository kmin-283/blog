import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "mongoose";
import fs from "fs";
import PostModel from "../../../models/post";

export const writeHelper = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title, tags, markdown } = req.body;
  try {
    fs.writeFileSync(`./mds/${title}.md`, markdown, "utf8");
    // await connect(`mongodb://localhost:27017/posts`);
    await connect(
      `mongodb://root:mongodb@localhost:27017/posts?authSource=admin`
    );
    const doc = new PostModel({
      title,
      tags,
      file: `./mds/${title}.md`,
    });
    await doc.save();
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default writeHelper;
