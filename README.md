I am trying to create a simple MERN stack blog app. Where there will be just two roles: admin and user.

The admin can create, read, delete and edit any blog post. The user can only read the blog post. They both need
to log in using their email and password.

I have just two entries in my database for users and admins: 
admin email: admin@gmail.com
admin password: admin
user email: user@gmail.com
user password: user

But I'm facing problem with the `PersistLogin.jsx` component which is in the `client/src/features/auth/PersistLogin.jsx` directory.

If I wrap the `PersistLogin.jsx` component like the following, afther the admin logs in, he can view the `add-new-post` page. He can also see the edit post button in the `SinglePostPage` that only the admin can see.
```js
export default function App() {
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

        <Route path="*" element={<div>Error 404</div>} />
      </Route>
    </Routes>
  );
```

But when the page reloads, the admin can't see the edit post button in the `SinglePostPage` and the `Add new post` link in the navbar disappears.

If I type the url `localhost:5173/add-new-post` and enter, the admin can again view the `Add new post` link in the navbar and edit post button in the `SinglePostPage`.


