import express from 'express';
import multer from 'multer';
import Article from '../models/postsmodel.js'; // Import the Article model

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save uploads in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file with a timestamp
    }
});

const upload = multer({ storage: storage });

// Define the POST route with image upload
router.post('/add', upload.single('image'), async (req, res) => {
    const { title, subtitle, content, category } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        // Create a new Article document
        const newArticle = new Article({
            title,
            subtitle,
            content,
            category,
            image, // Save the image path in the database
        });

        // Save the article to the database
        await newArticle.save();

        // Send a success response
        res.status(201).send('Article added successfully');
    } catch (error) {
        console.error("Error adding article:", error);
        res.status(500).send('Server error');
    }
});

// Get all posts from the database
router.get('/view', async (req, res) => {
    try {
        // Retrieve all articles from the database
        const articles = await Article.find();

        // Send the articles as a response
        res.status(200).json(articles);
    } catch (error) {
        console.error("Error retrieving articles:", error);
        res.status(500).send('Server error');
    }
});

// Delete a post by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the article from the database
        await Article.findByIdAndDelete(id);

        // Send a success response
        res.status(200).send('Article deleted successfully');
    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).send('Server error');
    }
});

// Update a post by ID
// Update a post by ID
router.patch('/update/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { title, subtitle, content, category } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        // Find the article by id
        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).send('Article not found');
        }

        // Update fields
        article.title = title;
        article.subtitle = subtitle;
        article.content = content;
        article.category = category;

        // Update image if a new one is uploaded
        if (image) {
            article.image = image;
        }

        // Save the updated article
        await article.save();

        // Send a success response
        res.status(200).send('Article updated successfully');
    } catch (error) {
        console.error("Error updating article:", error);
        res.status(500).send('Server error');
    }
});



// View single post by ID
router.get('/view/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the article by ID
        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).send('Article not found');
        }

        // Send the article as a response
        res.status(200).json(article);
    } catch (error) {
        console.error("Error retrieving article:", error);
        res.status(500).send('Server error');
    }
});

// Export the router
export default router;
