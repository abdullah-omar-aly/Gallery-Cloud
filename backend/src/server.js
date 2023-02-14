import mongoose from 'mongoose';
import {app} from './app'

let port = 8080

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
  app.listen(port, () => {
    console.log('Magic happens on port ' + port);
  });
})