import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running on port : ${process.env.PORT} `);
    });
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION FAILED", err);
  });

// import express from "express"
// const app = express()

// (async()=>{
//     try {
//         await mongoose.connect(`${process.env.DBURL}/${DB_NAME}`)
//         app.on("error" , (error) => {
//             console.log("ERROR" , error);
//             throw error
//         })
//         app.listen(process.env.PORT,() => {
//             console.log(`App is listening ${
//                 process.env.PORT}`);
//         })
//     }
//     catch(error) {
//         console.error("ERROR" , error)
//     }
// })()
