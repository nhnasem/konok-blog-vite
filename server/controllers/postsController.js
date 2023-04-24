const PostModel = require("../models/PostModel");

const createPost = async (req, res) => {
  try {
    const newPost = await PostModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "successfully added a new post",
      data: newPost,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "something went wrong while creating a new post",
    });
    console.log(error);
  }
};

const createManyPosts = async (req, res) => {
  try {
    const manyPosts = await PostModel.insertMany(req.body);
    res.status(201).json({
      success: true,
      data: manyPosts,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "something went wrong while creating many posts",
    });
    console.log(error);
  }
};

const getPosts = async (req, res) => {
  const pageNumber = req.query.pageNumber;
  const limit = 4;

  try {
    const totalPosts = await PostModel.countDocuments({});

    const posts = await PostModel.find().sort({createdAt: -1}).limit(limit * pageNumber);
    const maxPageNumber = Math.floor(totalPosts / limit) + 1;
    console.log(maxPageNumber);
    res.status(200).json({
      success: true,
      totalPosts: totalPosts,
      maxPageNumber: maxPageNumber,
      posts: posts,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "something went wrong while fetching posts",
    });
    console.log(error);
  }
};

const getSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;

    console.log(postId);

    const singlePost = await PostModel.findOne({ _id: postId });

    res.status(200).json({
      success: true,
      message: "data fetched success",
      post: singlePost,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "something went wrong while fetching posts",
    });
    console.log(error);
  }
};

const editPost = async (req, res) => {
  try {
    const id = req.params.id;

    console.log("id: ", id)

    const editedPost = await PostModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!editedPost) {
      return res
        .status(400)
        .json({ success: false, message: "post doesn't exits" });
    }

    console.log('edited psot', editedPost)

    res.status(200).json({
      success: true,
      message: "post successfully updated",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error,
      message: "something went wrong while editing the post",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedPost = await PostModel.findOneAndDelete({ _id: id });

    if (!deletedPost) {
      return res
        .status(400)
        .json({ success: false, message: "post doesn't exits" });
    }

    res.status(200).json({
      success: true,
      message: "post successfully deleted",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "something went wrong while deleting the post",
    });
  }
};

module.exports = {
  createPost,
  editPost,
  createManyPosts,
  getPosts,
  getSinglePost,
  deletePost,
};
