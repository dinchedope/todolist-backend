import TaskModel from '../models/Task.js';

import mongoose from 'mongoose';

export const create = async(req, res) => {
    try{
        const doc = new TaskModel({
            name: req.body.name,
            description: req.body.description,
            referTo: req.body.referTo,
        });

        const task = await doc.save();

        res.json({
            task,
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать Task',
        })
    }
};