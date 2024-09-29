import bookModel from "../models/bookModel.js";
import express from 'express';
import userModel from "../models/userModel.js";
import upload from "../cloudinary/multer.js";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await bookModel.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/users', async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
router.get('/:id', async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/',upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : req.body.image;
    const { title, author, description, publicationDate, borrowedBy,available, isBorrowed,genre } = req.body;
    console.log(req.body);
    const newBook = await bookModel.create({title, author, description, publicationDate, available, isBorrowed,genre ,image:imageUrl});
    res.status(201).json({newBook, message: 'Book created successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    console.log(req.body, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<put");
    
    const imageUrl = req.file ? req.file.path : req.body.image;    
    const updatedData = { ...req.body, image: imageUrl };
    const updatedBook = await bookModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ updatedBook, message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await bookModel.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/borrow', async (req, res) => {
  try {
    const user = req.body.user;

    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    book.isBorrowed = true;
    book.available = false;
    await book.save();
    res.json({book, message: 'Book borrowed successfully' , borrwer: req.body.user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/return', async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    book.isBorrowed = false;
    book.available = true;
    await book.save();
    res.json({book, message: 'Book returned successfully', returner: req.body.user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
