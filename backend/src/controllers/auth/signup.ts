import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { validateRequest } from '../../middleware/validate-request';
import { User } from '../../models';


const router = express.Router();

router.post(
    '/api/signup',
    [
      body('email').isEmail().withMessage('Email must be valid'),
      body('name').notEmpty(),
      body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
            
      try {
        const { email, name, password } = req.body;
  
        // 1. Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).send({ errors: [{ message: 'Email already in use' }] });
        }
    
        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // 3. Create user
        const user = await User.create({ 
          email, 
          name,
          password: hashedPassword 
        });
        
    
        // 4. Generate JWT
        const userJwt = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET!,
          { expiresIn: '1h' }
        );
    
        // 5. Store JWT in session (optional) or send it
        res.status(201).send({
          token: userJwt,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt
          },
        });

      } catch (err) {
        console.error('Signup error:', err);
        res.status(500).send({ message: 'Internal Server Error' });
      }

    }
);
  


export { router as signupRouter };