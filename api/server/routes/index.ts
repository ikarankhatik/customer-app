import express from 'express';
import userRouter from './user.js'; 
import customerRouter from './customer.js';
const router = express.Router();

// Common router
router.use('/customer', customerRouter);
router.use('/user', userRouter);


export default router;
