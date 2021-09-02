import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export const writeHelper = (req: NextApiRequest, res: NextApiResponse) => {
  const { title, tags, markdown } = req.body;
  try {
    fs.writeFileSync(`./mds/${title}.md`, markdown, "utf8");
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default writeHelper;
