import Note from '../models/note.model.js';

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: [note],
    });
  } catch (error) {
    console.log('An error occured in the createNote controller:');
    next(error);
  }
};

export const getNotes = async (req, res, next) => {
  try {
    const note = await Note.find({ user: req.user.id });
    res.status(200).json({ success: true, data: [note] });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res
        .status(404)
        .json({ success: false, message: 'Note not found' });
    }

    res.status(200).json({ success: true, data: updatedNote });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      const error = new Error('no notes found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, message: 'Note deleted' });
  } catch (error) {
    next(error);
  }
};
