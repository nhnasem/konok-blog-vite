import { Routes, Route } from "react-router-dom";

import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./components/Layout";
import AboutPage from "./features/about/AboutPage";
import ContactPage from "./features/contact/ContactPage";
import EditPostForm from "./features/posts/EditPostForm";
import AddPostForm from "./features/posts/AddPostForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="about">
          <Route index element={<AboutPage />} />
        </Route>

        <Route path="contact">
          <Route index element={<ContactPage />} />
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="*" element={<div>Error 404</div>} />
      </Route>
    </Routes>
  );
}

export default App;
