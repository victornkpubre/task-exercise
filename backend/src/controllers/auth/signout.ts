// routes/signout.ts
import express from 'express';

const router = express.Router();

router.post('/api/signout', (req, res) => {
  res.status(200).send({ message: 'Signed out successfully' });
});

export { router as signoutRouter };
