import express from "express";
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PORT } from "./config.js";
import multer from "multer";
import { v4 as uuid } from "uuid";
import * as path from 'path';

import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)
app.set('view engine', 'ejs');
app.set('views', join(__dirname, './views'));


app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
})
app.use(multer({ storage }).single('image'));

app.use(express.json());

app.use(indexRoutes);
app.use(taskRoutes);

app.use(express.static(join(__dirname, './public')))

app.listen(PORT);
console.log(`Server is listening on port`, PORT)
//console.log(`Server is listening on port ${PORT}`);
