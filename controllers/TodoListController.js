import TodoListModel from '../models/TodoList.js'; 
import User from '../models/User.js';

import mongoose, { isObjectIdOrHexString } from 'mongoose';

export const create = async(req, res) => {
    try{
        const doc = new TodoListModel({
            title: req.body.title,
            description: req.body.description,
            toDo: req.body.toDo,
            toCall: req.body.toCall,
            toGet: req.body.toGet,
            haveAccess: req.body.haveAccess,
        });

        const todoList = await doc.save();

        res.json({
            todoList
        });
    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося створити статтю',
        });
    }
};

export const getOne = async(req, res) => {
    try{
        const todoListId = req.params.id;

        await TodoListModel.findById(todoListId)
        .where('haveAccess').
        in([req.userId])
        .populate('haveAccess')
        .then(
            todoList => {
                if(!todoList){
                    return res.status(404).json({
                        message: 'TodoList не найден',
                    });
                }

                res.json({
                    todoList,
                });
            }
        ).catch(err => {
            console.log(err);
            return res.status(500).json({
                message: 'Не удалось найти статью',
            })
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить TodoList',
        });
    }
};

export const getAll = async(req, res) => {
    try{
        console.log(req.userId);
        const todoLists = await TodoListModel.find()
        .where('haveAccess').
        in([req.userId])
        .populate('haveAccess')
        .exec();

        res.json(todoLists);

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

export const remove = async(req, res) => {
    try{
        const todoLstId = req.params.id;

        await TodoListModel.findOneAndDelete({
            _id : todoLstId,
        }).then(post => {
            if(!post){
                return res.status(404).json({
                    message: 'TodoList не существует',
                });
            }
            res.json({
                message: `TodoList ${post.title} удалён`,
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось удалить',
            });
        });

    } catch(err)
    {
        console.log(err);
        res.status(500).json({
            message: 'Произошла ошибка запроса в БД',
        });
    }
}

export const update = async(req, res) => {
    try{
        //console.log(req);
        console.log(req.body);
        const todoListId = req.params.id;
        
        await TodoListModel.updateOne({
            _id: todoListId,
        },{
            title: req.body.title,
            description: req.body.description,
            toDo: req.body.toDo,
            toCall: req.body.toCall,
            toGet: req.body.toGet,
            haveAccess: req.body.haveAccess, 
        }).then(post => {
            res.json({
                ...post,
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Не удалось обновить данные",
            })
        });


    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'При редактировании произошла ошибка',
        })
    }
}
