import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from '../controllers/note.controller.js';

const noteRouter = Router();

noteRouter.get('/', authorize, getNotes);
noteRouter.post('/', authorize, createNote);
noteRouter.put('/:id', authorize, updateNote);
noteRouter.delete('/:id', authorize, deleteNote);

export default noteRouter;
