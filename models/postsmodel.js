import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    image: { // Add the image field
        type: String,
        required: false // Optional if not every post has an image
    }
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
