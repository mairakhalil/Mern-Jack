import express from 'express';
import {createUser, getuser, deleteUser, updateUser} from '../controllers/user.controller.js'
const router = express.Router();

router.post('/create',createUser)
router.get('/get',getuser)
router.delete('/delete/:id',deleteUser)
router.put('/update/:id',updateUser)

export default router