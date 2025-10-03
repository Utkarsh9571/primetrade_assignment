import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/isAdmin.middleware.js';
import {
  getAllUsers,
  getAllNotes,
  deleteNoteById,
  updateUserRole,
} from '../controllers/admin.controller.js';

const adminRouter = Router();

adminRouter.get('/users', authorize, isAdmin, getAllUsers);
adminRouter.get('/notes', authorize, isAdmin, getAllNotes);
adminRouter.delete('/note/:id', authorize, isAdmin, deleteNoteById);
adminRouter.patch('/user/:id', authorize, isAdmin, updateUserRole);

export default adminRouter;
