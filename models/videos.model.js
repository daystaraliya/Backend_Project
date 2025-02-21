import mongoose from "mongoose"

const videosSchema = new mongoose.Schema({
    videoFile:{
        type:String,
        required:true
    },
    thumbnail:{
        type : String
        

    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        required:true
    },
    isPublished:{
        type:Boolean
    },
    

},{timestamps:true})

export const Video = mongoose.model("Video" , videosSchema)