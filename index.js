import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import usersRoutes from './routes/users.js';
import booksRoutes from './routes/books.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/books', booksRoutes);
app.use('/api/user', usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Сервер запущен на порту ${PORT}`));
