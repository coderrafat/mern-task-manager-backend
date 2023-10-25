const { taskCreateService, taskDeleteService, taskFindByRemarkService, taskUpdateService, taskCountService } = require("../services/taskSevice");


exports.taskCreateController = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { email } = req.headers;

        const result = await taskCreateService(title, description, email);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.taskFindByRemarkController = async (req, res, next) => {
    try {
        const { remark } = req.params;
        const { email } = req.headers;

        const result = await taskFindByRemarkService(email, remark);

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};

exports.taskUpdateController = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;
        const { email } = req.headers;
        const { taskId } = req.params;

        const result = await taskUpdateService(
            email, taskId, title, description, status
        );

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};

exports.taskDeleteController = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const { email } = req.headers;

        const result = await taskDeleteService(taskId, email);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.taskCountController = async (req, res, next) => {
    try {
        const { email } = req.headers;

        const result = await taskCountService(email);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

