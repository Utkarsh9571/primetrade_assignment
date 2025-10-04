import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';
import logger from '../config/logger.js';

dotenv.config();

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Checking if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [
        {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          role,
        },
      ],
      { session }
    );

    // JWT is now generated for the response and further endpoints
    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    logger.error('Failed to create a user', error);
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error('Invalid Password');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const { password: _, ...safeUser } = user.toObject();
    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user: safeUser,
      },
    });
  } catch (error) {
    logger.error('Failed to login', error);
    next(error);
  }
};
