import 'dotenv/config'
import connectDB from './db/index.js'

connectDB()








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