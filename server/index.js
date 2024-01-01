import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import product from './routes/productRoute.js';
import user from './routes/userRoutes.js';

import category from './routes/categoryRoutes.js';
import handleError from './middleware/error.js';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(handleError);


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));





app.use('/api', product);
app.use('/api', user);

app.use("/api", category);



const PORT = process.env.PORT || 5000;



mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

