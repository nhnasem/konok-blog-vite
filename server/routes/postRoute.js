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
const verifyJWT = require("../middlewares/verifyJWT")

// router.use(verifyJWT)

router.post("/", verifyJWT, createPost);

router.post("/create-many", createManyPosts) // for testing only

router.get("/", getPosts);

router.get("/:id", getSinglePost);

router.delete("/:id", verifyJWT, deletePost);

router.patch("/:id", verifyJWT, editPost);

module.exports = router
