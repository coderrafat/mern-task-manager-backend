const { taskCreateController, taskDeleteController, taskFindByRemarkController, taskUpdateController, taskCountController } = require('../controllers/taskController');
const { isLogin } = require('../middlewares/auth');

const taskRouter = require('express').Router();

taskRouter.post('/task/create', isLogin, taskCreateController);

taskRouter.get('/task/:remark', isLogin, taskFindByRemarkController);

taskRouter.post('/task/update/:taskId', isLogin, taskUpdateController);

taskRouter.delete('/task/delete/:taskId', isLogin, taskDeleteController);

taskRouter.get('/tasks', isLogin, taskCountController);



module.exports = taskRouter;