import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';

import UserModel from './models/User.js';
import { registerValidation, loginValidation } from './validations/validations.js';

import { handleValidationErrors } from './utils/index.js';
import { UserController, TodoListController, TaskController } from './controllers/index.js';
import checkAuth from './utils/checkAuth.js';
import { check } from 'express-validator';



const PORT = process.env.PORT ?? 4000;

mongoose
    .connect('mongodb+srv://dinchedope:rfvujm000@cluster0.sh8xriu.mongodb.net/blog?retryWrites=true&w=majority',)
    .then(() => {console.log('DB OK')})
    .catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());
app.use(cors());

app.post('/', async(req, res) => {

});

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/todolist', checkAuth, TodoListController.create);
app.get('/todolist/:id', checkAuth, TodoListController.getOne);
app.get('/todolist', checkAuth, TodoListController.getAll);
app.delete('/todolist/:id', checkAuth, TodoListController.remove);
app.patch('/todolist/:id', checkAuth, TodoListController.update);

app.listen(PORT, (err) => {
    if(err){
        return console.log(err);
    }

    console.log('Server OK!'+ PORT);
})