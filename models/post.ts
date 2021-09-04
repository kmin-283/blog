import { model, Schema, SchemaTypes } from "mongoose";

interface Post {
  title: string;
  tags: string[];
  file: string;
}

const postSchema = new Schema<Post>({
  title: { type: SchemaTypes.String, required: true },
  tags: [SchemaTypes.String],
  file: SchemaTypes.String,
});

const PostModel = model<Post>("Post", postSchema);

export default PostModel;
