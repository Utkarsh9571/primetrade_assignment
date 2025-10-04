import User from '../models/user.model.js';
import Note from '../models/note.model.js';
import logger from '../config/logger.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, 'email role');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    logger.error('Failed to fetch users', error);
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().populate('user', 'email');

    if (notes.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: 'No notes found', data: [] });
    }

    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    logger.error('Failed to fetch notes', error);
    next(error);
  }
};

export const deleteNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Note deleted' });
  } catch (error) {
    logger.error('Failed to delete note for the user', error);
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Role updated', data: updatedUser });
  } catch (error) {
    logger.error('Failed to update a user role', error);
    next(error);
  }
};
