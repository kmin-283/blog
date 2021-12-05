import { createConnection } from "mongoose";

// const connection = {
//   isConnected: 0,
// };

const connectDB = () => {
  // if (connection.isConnected === 1) {
  //   return;
  // }
  // await connect(process.env.MONGO_URL!, { dbName: "posts" });
  // connection.isConnected = mongoose.connections[0].readyState;
  return createConnection(process.env.MONGO_URL!, { dbName: "posts" });
};

export default connectDB;
// export { connection };
