import mongoose, { model } from 'mongoose';
import user from './User.js';


const TodoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    toDo: [{
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    }],
    toCall: [{
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    }],
    toGet: [{
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    }],
    haveAccess: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
   
 
}, {
    timestamps: true,
    collection: "TodoLists",
});

export default mongoose.model('TodoList', TodoListSchema);