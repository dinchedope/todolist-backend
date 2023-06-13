import mongoose, { model } from 'mongoose';

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    referTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TodoList',
        //required: true,
    }
},
{
    timestamps: true,
    collection: "Tasks",
});

export default mongoose.model("Task", TaskSchema);