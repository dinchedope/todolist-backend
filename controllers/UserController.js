import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken'

import mongoose from 'mongoose';

export const register = async (req, res) => {
    try{
        const doc = new UserModel({
            email: req.body.email,
            nickName: req.body.nickName,
            passwordHash: req.body.password,
        });

        const user = await doc.save();

        //console.log(user);

        const token = jwt.sign({
            _id: user._id,
        },
            'secretword',
        {
            expiresIn: '30d',
        });

        const userData = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        })
    }
}

export const login = async (req, res) => {
    try{
        console.log(req.body);
        const user = await UserModel.findOne({ email: req.body.email });
        if(!user){
            return res.status(404).json({
                message: 'Неверный логин или пароль',
            });
        }

        const isValidPass = req.body.password === user._doc.passwordHash;

        if(!isValidPass){
            return res.status(404).json({
                message: 'Неверный логин или пароль',
            });
        }

        const userData = user._doc;

        const token = jwt.sign({
            _id: user._id,
        },
            'secretword',
        {
            expiresIn: '30d',
        });

        res.json({
            ...userData,
            token,
        })

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизироваться',
        })
    }
}

export const getMe = async(req, res) =>{
    try{
        const user = await UserModel.findById(req.userId);

        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const userData = user._doc;
        
        res.json({
            ...userData,
        });

    } catch (err){
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
}