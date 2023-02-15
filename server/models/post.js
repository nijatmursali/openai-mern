import mongoose from "mongoose";

// create mongoose schema

const Post = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;