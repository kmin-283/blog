import mongoose, { model, Schema } from "mongoose";

export interface IPost {
  _id: string;
  title: string;
  tags: string[];
  file: string;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    tags: [String],
    file: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post || model<IPost>("Post", postSchema);
