const { ValidationError, NotFoundError } = require('custom-error-handlers/error');
const { taskCreateValidation } = require('../validation/validation');
const taskModel = require('../models/taskModel');


//!Task Create Service
exports.taskCreateService = async (title, description, email) => {

    //!Call Task Create Validation Function
    taskCreateValidation(title, description);

    await taskModel.create(
        { title, description, status: 'new', email: email }
    );

    return {
        status: 'success',
        massage: 'Your task has been created!'
    };

};

//!Task Find By remark
exports.taskFindByRemarkService = async (email, remark) => {

    const task = await taskModel.find(
        { email, status: remark },
        { createdAt: 0, updatedAt: 0 },
    );

    if (!task) {
        throw new NotFoundError('Task not found');
    }

    return { status: 'success', data: task }

};

//!Task Update By email
exports.taskUpdateService = async (email, taskId, title, description, status) => {

    const task = await taskModel.findById(taskId);

    if (!task) {
        throw new NotFoundError('Task not found');
    }

    await taskModel.findOneAndUpdate(
        { email },
        { title, description, status }
    )

    return { status: 'success', massage: 'Task Save Changed' };
};

//!Task Delete Service
exports.taskDeleteService = async (taskId, email) => {

    const task = await taskModel.findById(taskId);

    if (!task) {
        throw new NotFoundError('Task not found')
    }

    await taskModel.findOneAndDelete({ email }, { _id: taskId });

    return { status: 'success', massage: 'Task has been deleted!' };

};

//!Task Count Service
exports.taskCountService = async (email) => {

    const progressTask = await taskModel.find({ email, status: 'progress' }).count();

    const newTask = await taskModel.find({ email, status: 'new' }).count();

    const cancelledTask = await taskModel.find({ email, status: 'cancelled' }).count();

    const completedTask = await taskModel.find({ email, status: 'completed' }).count();

    return {
        status: 'success',
        data: {
            progressTask,
            newTask,
            cancelledTask,
            completedTask
        }
    }


}

