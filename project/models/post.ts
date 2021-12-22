import { Schema } from "mongoose";

export interface IPost {
  _id: string;
  title: string;
  tags: string[];
  file: string;
  thumbnail: string;
  description: string;
  internalLinks?: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IPostWithMarkdown extends IPost {
  markdown: string;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    tags: { type: [String] },
    file: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    internalLinks: { type: String },
  },
  {
    timestamps: true,
  }
);

export default postSchema;
