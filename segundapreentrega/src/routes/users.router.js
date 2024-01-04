import { Router } from 'express';
import usersModel from '../dao/models/users.model.js';

const userRouter = Router();

userRouter.get('/users', async (req, res) => {
    const users = await usersModel.find({});
    res.status(200).json(users);
});

userRouter.post('/users', async (req, res) => {
    const { body } = req;
    const user = await usersModel.create(body);
    res.status(201).json(user);
});
  
userRouter.get('/users/:uid', async (req, res) => {
    const { uid } = req.params;
    const user = await usersModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: 'User not found 😨' });
    }
    res.status(200).json(user);
});
  
userRouter.put('/users/:uid', async (req, res) => {
    const { uid } = req.params;
    const { body } = req;
    await usersModel.updateOne({ _id: uid }, { $set: body });
    res.status(204).end();
});
  
userRouter.delete('/users/:uid', async (req, res) => {
    const { uid } = req.params;
    await usersModel.deleteOne({ _id: uid });
    res.status(204).end();
});
  

export default userRouter