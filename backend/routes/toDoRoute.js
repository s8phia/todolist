import express from 'express';
import { toDo } from '../models/toDoModel.js';

const router = express.Router();


router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title 
        ) {
            return response.status(400).send({
                message: 'send all rq fields: title',
            });
        }
        const newToDo = {
            title: request.body.title,
         
        };
        
        const todo = await toDo.create(newToDo);
        return response.status(201).send(todo);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

router.get('/', async (request, response) => {
    try {
        const todo = await toDo.find({});

        return response.status(200).json(
            {
                data: todo
            });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

router.delete('/', async (request, response) => {
    try {
        const { id } = request.params;

        const deletedToDo= await toDo.findByIdAndDelete(id);
        if (!deletedToDo) {
            return response.status(404).json({ message: 'todo not found' })
        }

        return response.status(200).send({ message: 'successfully deleted todo' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { title } = request.body;

        if (!title) {
            return response.status(400).json({ message: 'Title is required' });
        }

        const updatedTodo = await toDo.findByIdAndUpdate(
            id,
            { title: title },   
            { new: true } 
        );

        if (!updatedTodo) {
            return response.status(404).json({ message: 'Todo not found' });
        }

        return response.status(200).json(updatedTodo);

    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
});


export default router;