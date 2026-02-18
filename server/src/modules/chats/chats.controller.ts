
import { Request, Response } from 'express'
import { prisma } from '../../../lib/prisma'
import chatService from './chats.service';

class ChatController {
    async getAll(req: Request, res: Response) {
        const chats = await chatService.getAll();
        res.status(200).send({ chats });
    }
}

export default new ChatController();