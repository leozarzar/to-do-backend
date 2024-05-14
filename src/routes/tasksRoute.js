const {Router} = require('express');
const TaskController = require('../controllers/TaskController.js');

const router = Router();

router.get('/tasks', TaskController.getAll);
router.get('/tasks/:id', TaskController.getById);
router.post('/tasks', TaskController.add);
router.delete('/tasks/:id', TaskController.removeById);
router.delete('/tasks', TaskController.removeAll);
router.patch('/tasks/:id', TaskController.updateById);

module.exports = router;