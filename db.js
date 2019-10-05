const mongoose = require('mongoose');
const options = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false};
const env = process.env.NODE_ENV;
let URI = process.env.MONGO_URI;

if(env === 'development') {
  URI = process.env.LOCAL_MONG_URI;
}
mongoose.connect(URI, options);

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection is open.');

});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected.');
});

mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));

process.on('SIGINT', () => {
  mongoose.disconnect(() => {
    console.log('Mongoose default connection disconnected through app termination.');
    process.exit(0);
  });
});
