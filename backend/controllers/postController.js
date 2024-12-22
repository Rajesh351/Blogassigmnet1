const Post = require('../models/Post');
const generateSummary = require("../utils/aiSummarizer")

// Create a new blog post
const createPost = async (req, res) => {
    const { title, content } = req.body;

    // Check if title or content is missing
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        console.log("Title:", title, "Content:", content);
        
        // Get summary of the content
        const summary = await generateSummary(content);
        console.log("Generated Summary:", summary);
        
        // Create a new post in the database
        const post = new Post({ title, content,summary});
        await post.save();
        
        // Send the created post in the response
        return res.status(201).json({
            success:true
        });
        
    } catch (error) {
        // Error handling if creating the post fails
        console.error("Error creating post:", error);
        return res.status(500).json({ message: 'Error creating post', error });
    }
};

// Get all blog posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json({
            posts,
            success:true
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', 
            success:false
        });
    }
};

// Get a single blog post
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
};

// Update a blog post
const updatePost = async (req, res) => {
    const { title, content } = req.body;
    try {
        // const summary = await generateSummary(content);
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!post) return res.status(404).json({ message: 'Post not found',
         });
        res.status(200).json(
            {
                success:true
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
};

// Delete a blog post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post deleted successfully',
            success:true
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
};

module.exports = { createPost, getPosts, getPost, updatePost, deletePost };
