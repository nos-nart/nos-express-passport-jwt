const mongoose = require('mongoose');
const { config } = require('../config');

const MONGO_URI = `mongodb+srv://nosnart:${config.atlasPw}@cluster0.z5646.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      MONGO_URI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true ,
        useFindAndModify: false
      }
    )

    return connection;
  } catch (err) {
    console.log('err: ', err);
    process.exit(1);
  }
}

module.exports = { connectDB };
