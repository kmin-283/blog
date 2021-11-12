import mongoose, { connect } from "mongoose";

const connection = {
  isConnected: 0,
};

const connectDB = async () => {
  if (connection.isConnected === 1) {
    return;
  }
  await connect(process.env.MONGO_URL!, { dbName: "posts" });
  connection.isConnected = mongoose.connections[0].readyState;
};

export default connectDB;
export {connection};
