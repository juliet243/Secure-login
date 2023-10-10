const express = require('express');
const app = express();
const router = express.Router();
const auth = require('../middleware/auth')
const {Post, validatePost} = require('../models/post');

//get all posts
router.get('/', auth, async(req, res) => {
    const posts = await Post.find();
    res.send(posts);
})

// Create new post
router.post('/', auth, async (req, res) => {
    try{

        const { error } = validatePost(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const post = new Post(req.body);
        await post.save();

        res.status(201).json(post); // Use status code 201 for successful creation
    } catch (err) {
        console.error(err); // Log any unexpected errors
        res.status(500).json({ error: 'Internal server error' }); // Handle internal errors gracefully
    }
});


//Get single post
router.get('/:id', auth,async (req,res) => {
    const post = await Post.findById(req.params.id);
    if(post) return res.send(post);
    res.sendStatus(404);
});

//Delete a post
router.delete('/:id', auth, async(req, res) =>{
    const result = await Post.deleteOne({_id: req.params.id});
    res.send(result);
});

module.exports = router;