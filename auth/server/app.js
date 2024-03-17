import express from 'express';
const app = express();
const port = 8000;
import path from 'path';
// import indexRouter from './routes/index.js';
import userRouter from './routes/users.js';
import bodyParser from 'body-parser';
import db from './config/db.js';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use('/', indexRouter);
app.use('/users', userRouter);


app.listen(port, function(){
  console.log(`Listening on locahost:${port}`);
});