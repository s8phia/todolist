import express from "express";
import mongoose from 'mongoose';
import { mongoDbURL, PORT } from "./config.js";
import todosRoute from "./routes/ToDoRoute.js";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Hello world");
});

mongoose.connect(mongoDbURL)
    .then(() => {
        console.log('App connected to database');

        app.use('/api/todos', todosRoute);

        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('DB connection error:', error);
    });

app.use('/api/todos', todosRoute);
