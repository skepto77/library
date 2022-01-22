import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import passport from './config/passport-setup.js';
import pagesBooksRoutes from './routes/pagesBooks.js';
import pagesUsersRoutes from './routes/pagesUsers.js';
import pagesIndexRoutes from './routes/pagesIndex.js';
import usersRoutes from './routes/users.js';
import booksRoutes from './routes/books.js';
import MongoStore from 'connect-mongo';

dotenv.config();
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'qwerty',
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   secure: false,
    //   sameSite: false,
    //   // domain= '.localhost',
    //   maxAge: 60 * 60 * 1000,
    //   httpOnly: true,
    // },
    // store: MongoStore.create({
    //   mongoUrl: process.env.MONGO_URL,
    //   mongooseConnection: mongoose.connection,
    //   ttl: 14 * 24 * 60 * 60, // save session for 14 days
    // }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use('/', pagesIndexRoutes);
app.use('/user', pagesUsersRoutes);
app.use('/books', pagesBooksRoutes);
app.use('/api/user', usersRoutes);
app.use('/api/books', booksRoutes);

app.use((err, req, res, next) => {
  console.log('Message: ', err.message);
  res.status(404);
  if (err.statusCode === 404) {
    res.render('pages/404', {
      title: '404',
    });
  }

  if (err.statusCode === 500) {
    res.render('pages/500', {
      title: '500',
    });
  }
});

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Сервер запущен на порту ${PORT}`));
