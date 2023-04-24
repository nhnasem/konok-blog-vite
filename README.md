I am trying to create a simple MERN stack blog app. Where there will be just two roles: admin and user.

The admin can create, read, delete and edit any blog post. The user can only read the blog post. They both need
to log in using their email and password.

I have just two entries in my database for users and admins: 
admin email: admin@gmail.com
admin password: admin
user email: user@gmail.com
user password: user

The problem I'm facing right now is that: when the admin logs in, he can view the `add-new-post` page
that creates a new blog post. He can also visit the edit post route which is in the `SinglePostPage`.

But when I reload the page, the admin can no longer visit the `add-new-post` page or the edit post page.

I need some way to keep the admin logged in so that he doesn't need to log in every time he reloads the page.
