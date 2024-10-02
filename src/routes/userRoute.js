const {Router} = require('express');
const UserController = require('../controllers/UserController.js');
const upload = require('../upload.js');

const router = Router();

router.get('/atlas/user', UserController.getAll);
router.get('/atlas/user/:id', UserController.getById);
router.post('/atlas/user', upload.single('image'), UserController.add);
router.delete('/atlas/user/:id', UserController.removeById);
router.delete('/atlas/user', UserController.removeAll);
router.patch('/atlas/user/:id', UserController.updateById);

module.exports = router;