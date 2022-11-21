const express = require('express');
const router = express.Router();


const usersController = require('../controllers/usersController')

router.get('/', usersController.getUsers);
router.get('/:id', usersController.profile);
router.post('/', usersController.register);
router.put('/:id', usersController.updateProfile);
router.delete('/:id', usersController.deleteUser);


module.exports = router;