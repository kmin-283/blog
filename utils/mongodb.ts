import mongoose, { connect } from "mongoose";

const connections = {
  isConnected: 0,
};

const connectDB = async () => {
  if (connections.isConnected === 1) {
    return;
  }
  await connect(process.env.MONGO_URL!, { dbName: "posts" });
  connections.isConnected = mongoose.connections[0].readyState;
};

export default connectDB;
