import mongoose from "mongoose" ;

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("connected to mongodb") ; 
  } catch (error) {
    console.log("Error connecting to MongoDb", error.message);
  }
};

export default connectMongoDb ;  
