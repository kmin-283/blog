import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  await connect(process.env.MONGO_URL!);
};

export default connectDB;
