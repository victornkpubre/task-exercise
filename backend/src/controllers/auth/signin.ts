// routes/signin.ts
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../../middleware/validate-request';
import { User } from '../../models';


const router = express.Router();

router.post(
  '/api/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // 1. Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return res.status(400).send({ errors: [{ message: 'Invalid credentials' }] });
        }
    
        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).send({ errors: [{ message: 'Invalid credentials' }] });
        }
    
        // 3. Generate JWT
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET!,
          { expiresIn: '1h' }
        );
    
        // 4. Return token
        res.status(200).send({
          token,
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

export { router as signinRouter };
