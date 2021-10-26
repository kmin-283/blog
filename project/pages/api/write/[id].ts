import {NextApiRequest, NextApiResponse} from "next";
import connectDB from "../../../utils/mongodb";
import Post, {IPost} from "../../../models/post";
import {readFileSync, renameSync, writeFileSync} from "fs";
import {getThumbnail} from "../../../utils/imageUpload";
import {makeInternalLinks} from "../../../utils/markdown";

connectDB().then();

interface PostData {
  prevTitle: string;
  title: string,
  tags: string,
  description: string,
  markdown: string
}

interface PostRequest<T> extends NextApiRequest {
  body: T
}

const PostU = async (req: PostRequest<PostData>, res: NextApiResponse) => {
  const {
    query: {id},
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const post = (await Post.findById(id)) as IPost;

        if (!post) {
          return res
            .status(400)
            .json({success: false, error: "Post doesn't exist"});
        }
        const {title, tags, description, file} = post;
        const markdown = readFileSync(file, "utf8");
        return res.status(200).json({
          success: true,
          data: {title, tags, description, markdown},
        });
      } catch (error) {
        return res.status(400).json({success: false, error});
      }
    case "PUT":
      try {
        const {prevTitle, title, tags, description, markdown} = req.body;
        const thumbnail = getThumbnail(markdown);
        const internalLinks = makeInternalLinks(markdown);
        console.log(internalLinks);
        const file = `./mds/${title.replace(/\s/g, "-")}.md`;
        const post = await Post.findByIdAndUpdate(
          id,
          {
            title,
            tags,
            file,
            description,
            thumbnail,
            internalLinks
          },
          {
            new: true,
            runValidators: true,
          }
        );
        if (!post) {
          return res
            .status(400)
            .json({success: false, error: "Post doesn't exist"});
        }
        renameSync(`./mds/${prevTitle.replace(/\s/g, "-")}.md`, file);
        writeFileSync(file, markdown);
        return res.status(200).json({success: true});
      } catch (error) {
        return res.status(400).json({success: false, error});
      }
  }
};

export default PostU;
