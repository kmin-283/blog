import mongoose, { model, Schema } from "mongoose";

export interface IPost {
  _id: string;
  title: string;
  tags: string[];
  file: string;
  thumbnail: string;
  description: string;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    tags: [String],
    file: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post || model<IPost>("Post", postSchema);
