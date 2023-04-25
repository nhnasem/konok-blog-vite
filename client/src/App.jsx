import { Routes, Route } from "react-router-dom";

import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./components/Layout";
import AboutPage from "./features/about/AboutPage";
import ContactPage from "./features/contact/ContactPage";
import EditPostForm from "./features/posts/EditPostForm";
import AddPostForm from "./features/posts/AddPostForm";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  return (
    <Routes>
      {/* <Route element={<PersistLogin />}> */}
      <Route path="/" element={<Layout />}>
        {/* <Route path="register" element={<Register />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="" element={<PostsList />} />
        <Route path="blog/:blogPostId" element={<SinglePostPage />} />

        <Route element={<RequireAuth />}>
          <Route path="add-new-post" element={<AddPostForm />} />
          <Route path="blog/edit/:blogPostId" element={<EditPostForm />} />
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="*" element={<div>Error 404</div>} />
      </Route>
      {/* </Route> */}
    </Routes>
  );
}

export default App;
