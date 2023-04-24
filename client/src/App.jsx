import { Routes, Route } from "react-router-dom";

import Home from "./features/home/Home";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./components/Layout";
import AboutPage from "./features/about/AboutPage";
import ContactPage from "./features/contact/ContactPage";
import EditPostForm from "./features/posts/EditPostForm";
import AddPostForm from "./features/posts/AddPostForm";

// auth related routes
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />

        {/* <Route path="register" element={<Register />} /> */}
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="blog" element={<PostsList />} />
        <Route path="blog/:blogPostId" element={<SinglePostPage />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="add-new-post" element={<AddPostForm />} />
            <Route path="blog/edit/:blogPostId" element={<EditPostForm />} />
          </Route>
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="*" element={<div>Error 404</div>} />
      </Route>
    </Routes>
  );
}

export default App;
