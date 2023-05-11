const mongoose = require('mongoose');

async function connect() {
  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/education_dev");
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blognode.1cpegiz.mongodb.net/Blognode?retryWrites=true&w=majority`
    );
    console.log('Mongoose: Connect SUCCESSFULLY!!!');
  } catch (error) {
    console.log('Mongoose: Connect FAILED!!!');
  }
}

// [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back
// to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want
// to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.

mongoose.set('strictQuery', false);
module.exports = { connect };
