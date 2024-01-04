import {Router} from 'express';
import messageModel from '../dao/models/message.model.js';

const chatRouter = Router();


chatRouter.get('/chat', async(req,res) => {
    const messages = await messageModel.find({});
   res.render('chat' ,{messages,title: 'chat'});
});

export default chatRouter;