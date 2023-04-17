import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsSlice";
import DOMPurify from "dompurify"; // prevents from cross-site scripting attack

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [content, setContent] = useState("");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onImageURLChanged = (e) => setImageURL(e.target.value);
  // const onContentChanged = (e) => setContent(e.target.value);

  const canSave = [title, content, imageURL].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, imageURL, body: content }).unwrap();

        setTitle("");
        setImageURL("")
        setContent("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  return (
    <section className="border px-4 py-3 w-[700px] shadow-md mx-auto my-4">
      <h2 className="text-2xl text-center my-3 leading-8 tracking-wide font-light">Add a New Post</h2>
      <form className="flex-row">
        <div className="flex flex-col items-start mb-4">
          <label className="text-sm font-light leading-8 tracking-wide" htmlFor="postTitle">
            Post Title:
          </label>
          <input
            type="text"
            className="border px-3 py-2 w-full leading-8 tracking-wide"
            placeholder="Post Title"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
        </div>

        <div className="flex flex-col items-start mb-4">
          <label className="text-sm font-light leading-8 tracking-wide" htmlFor="postTitle">
            Image URL:
          </label>
          <input
            type="text"
            className="border px-3 py-2 w-full leading-8 tracking-wide"
            placeholder="Image URL"
            id="postImageURL"
            name="postImageURL"
            value={imageURL}
            onChange={onImageURLChanged}
          />
        </div>

        {/* <div className="flex flex-col items-start mb-4">
          <label className="text-md font-light" htmlFor="postContent">Content:</label>
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
          <h2 className="text-sm font-light leading-8 tracking-wide">Post body:</h2>
          <CKEditor
            editor={ClassicEditor}
            data=""
            onReady={(editor) => {
              editor.ui.view.editable.element.style.minHeight = "200px";
           }}
            onChange={(event, editor) => {
              editor.ui.view.editable.element.style.minHeight = "200px";
              const data = editor.getData();
              console.log({ event, editor, data });
              setContent(DOMPurify.sanitize(data))  
            }}
            onBlur={(event, editor) => {
              editor.ui.view.editable.element.style.minHeight = "200px";
              console.log("Blur.", editor);
            }}
    
            onFocus={(event, editor) => {
              editor.ui.view.editable.element.style.minHeight = "200px";
              console.log("Focus.", editor);
            }}
          />
        </div>

        <button
          className="text-center mr-4 px-4 py-3 bg-green-700 shadow-md text-white rounded-md"
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
