const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  deletePost,
  editPost,
  createManyPosts,
  getSinglePost,
} = require("../controllers/postsController");

router.post("/", createPost);
router.post("/create-many", createManyPosts) // for testing only
router.get("/", getPosts);
router.get("/:id", getSinglePost);
// router.delete("/:id", deletePost);
// router.patch("/:id", editPost);

module.exports = router
