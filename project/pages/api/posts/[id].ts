import {NextApiRequest, NextApiResponse} from "next";
import connectDB from "../../../utils/mongodb";
import Post from "../../../models/post";
import {unlink} from "fs";

connectDB().then();

const PostD = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {id},
    method,
  } = req;
  switch (method) {
    case "DELETE":
      try {
        const {title} = req.body;
        await unlink(`./mds/${title}.md`, (error) => {
          if (error) {
            throw new Error("Can't delete file");
          }
        });
        const response = await Post.deleteOne({_id: id});
        if (response.deletedCount === 1) {
          const posts = await Post.find({});
          return res.status(200).json({success: true, data: posts});
        } else {
          return res
            .status(400)
            .json({success: false, error: "Can't delete Metadata"});
        }
      } catch (error) {
        return res.status(400).json({success: false, error});
      }
  }
};

export default PostD;
