import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate-request';
import { sequelize } from '../config/db';

const router = express.Router();

router.post('/', 
    [
        body('username').notEmpty(),
        body('password').notEmpty(),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
    
    return res.status(201).json({ 
        "approved": true, 
        "auth_code": '00',
    }); 

});

export { router as authRouter };