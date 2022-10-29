import express from 'express';
import { createUserController } from '../../../useCases/createUser';

const userRouter = express.Router();

userRouter.get('/', (req, res) => res.send('hello from users routers'));

userRouter.post('/', (req, res) => createUserController.execute(req, res));

export { userRouter };
