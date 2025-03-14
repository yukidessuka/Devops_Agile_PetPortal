const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3002;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/petcare', {
    authSource: 'admin'
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define schemas and models
const postSchema = new mongoose.Schema({
    author: String,
    content: String,
    time: { type: Date, default: Date.now },
    comments: [{ author: String, content: String, time: { type: Date, default: Date.now } }]
});

const Post = mongoose.model('Post', postSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // เพิ่ม CORS middleware

// Routes
app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/posts/:id/comments', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        post.comments.push(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/posts/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/posts/:postId/comments/:commentId', async (req, res) => {
    try {
        const result = await Post.updateOne(
            { _id: req.params.postId },
            { $pull: { comments: { _id: req.params.commentId } } }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Comment not found or already deleted' });
        }

        res.status(204).send();  // 204 No Content
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
