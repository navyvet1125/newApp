import mongoose from 'mongoose';
const mongoUrl = 'mongodb://localhost/myDB';

mongoose.connect(mongoUrl)
  .then(console.log('database connected'))
  .catch(error => handleError(error))

export default mongoose