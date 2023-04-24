import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify"; // prevents from cross-site scripting attack

import { useGetSinglePostQuery } from "./postsSlice";
import { useUpdatePostMutation, useDeletePostMutation } from "./postsSlice";
import useAuth from "../../hooks/useAuth";

const EditPostForm = () => {
  const { blogPostId } = useParams();

  const { role, isAdmin } = useAuth();

  const navigate = useNavigate();

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost, { isError, isLoadingD, isSuccessD }] =
    useDeletePostMutation();

  const {
    data: post,
    isLoading: isLoadingPosts,
    isSuccess,
  } = useGetSinglePostQuery(blogPostId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log("role: ", role);
  }, [post?.post?.title]);

  useEffect(() => {
    if (isSuccess) {
      setTitle(post?.post?.title);
      setContent(post?.post?.body);
    }
  }, [isSuccess, post?.post?.title, post?.post?.body, post?.post?.userId]);

  if (isLoadingPosts) return <p>Loading...</p>;

  if (!post?.post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  // const onContentChanged = (e) => setContent(e.target.value);

  const canSave = [title, content].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    console.log("id: ", post?.post?._id);
    if (canSave) {
      try {
        const result = await updatePost({
          id: post?.post?._id,
          title,
          body: content,
        }).unwrap();

        if (result.success) {
          setTitle("");
          setContent("");
          navigate(`/blog/${blogPostId}`);
        }
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  const onDeletePostClicked = async () => {
    try {
      const result = await deletePost({ id: post?.post?._id }).unwrap();
      console.log(result);

      if (result.success) {
        setTitle("");
        setContent("");
        navigate("/blog");
      }
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  return (
    <section className="border px-4 py-3 w-[700px] shadow-md mx-auto my-4">
      <h2 className="text-2xl text-center my-3">Edit Post</h2>
      <form className="flex-row">
        <div className="flex flex-col items-start mb-4">
          <label className="text-md font-light" htmlFor="postTitle">
            Post Title
          </label>
          <input
            className="border px-3 py-2 w-full"
            type="text"
            placeholder="Post Title"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
        </div>

        {/* <div className="flex flex-col items-start mb-4">
          <label className="text-md font-light" htmlFor="postContent">
            Content
          </label>
          <textarea
            className="border px-3 py-2 w-full"
            rows="5"
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
        </div> */}

        <div className="mb-4">
          <h2 className="text-sm font-light">Post body:</h2>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onReady={(editor) => {
              editor.ui.view.editable.element.style.minHeight = "200px";
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              // console.log({ event, editor, data });
              setContent(DOMPurify.sanitize(data));
            }}
            onBlur={(event, editor) => {
              // console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              // console.log("Focus.", editor);
            }}
          />
        </div>

        {isAdmin && (
          <button
            className="text-center mr-4 px-4 py-3 bg-green-700 shadow-md text-white rounded-md"
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Save Post
          </button>
        )}

        {isAdmin && (
          <button
            className="text-center mr-4 px-4 py-3 bg-red-700 shadow-md text-white rounded-md"
            type="button"
            onClick={onDeletePostClicked}
          >
            Delete Post
          </button>
        )}
      </form>
    </section>
  );
};

export default EditPostForm;
