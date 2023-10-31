// import { user, course } from "@/pages/api/user/interface";
// import mongoose, { Document, Model, Schema } from "mongoose";


// const userSchema: Schema<user & Document> = new mongoose.Schema({
//   email: String,
//   password: String,
//   purchasedCourses:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
//   cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
// });

// const courseSchema: Schema<course & Document> = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   image: String,
//   published: Boolean,
//   adminId: String,
//   name: String,
// });


// export const UserModel: Model<user & Document> =
//   mongoose.models.User || mongoose.model<user & Document>('User', userSchema);

// export const CourseModel: Model<course & Document> =
//   mongoose.models.Course || mongoose.model<course & Document>('Course', courseSchema);

// // Ensure database connection
// let alreadyDone = false;

// export async function ensureDbConnected() {
//   if (alreadyDone) {
//     console.log("Database connection already established.");
//     return;
//   }

//   try {
//     // Use the environment variable for the MongoDB URI
//    // const mongoUri ="mongodb+srv://kirattechnologies:iRbi4XRDdM7JMMkl@cluster0.e95bnsi.mongodb.net/courses";
//    const mongoUri ="mongodb+srv://reddypranai:pranai123456@cluster0.mf65rxf.mongodb.net/"
//     await mongoose.connect(mongoUri, {
//       dbName: 'courses',
//     });
//     alreadyDone = true;
//     console.log('Connected to MongoDB');
 
   
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw error;
//   }
// }
