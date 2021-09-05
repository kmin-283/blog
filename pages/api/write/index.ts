import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import PostModel from "../../../models/post";
import connectDB from "../../../utils/mongodb";

export const writeHelper = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title, tags, markdown } = req.body;
  try {
    fs.writeFileSync(`./mds/${title}.md`, markdown, "utf8");
    await connectDB();
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
