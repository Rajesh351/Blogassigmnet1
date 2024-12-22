const express = require('express');
const {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
} = require('../controllers/postController');

const router = express.Router();
//
//http://localhost:5000/api/posts/allpost
//http://localhost:5000/api/posts/getbyid
//http://localhost:5000/api/posts/updatebyid
//http://localhost:5000/api/posts/deletedbyid
router.post('/createpost', createPost);
router.get('/allpost', getPosts);
router.get('/getbyid/:id', getPost);
router.put('/updatebyid/:id', updatePost);
router.delete('/deletedbyid/:id', deletePost);

module.exports = router;
