import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://kpwork:kpworktamoto@cluster0.adgtq.mongodb.net/food-del"
    )
    .then(() => console.log("Connected to MongoDB"));
};
