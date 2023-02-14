import mongoose from "mongoose";


const connect = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url).then(() => {
        console.log("Successfully connected to MongoDB");
    }).catch((err) => { console.log(err) }
    );
}

export default connect;