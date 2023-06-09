import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetSinglePostQuery } from "./postsSlice";
import { useEffect } from "react";

import useAuth from "../../hooks/useAuth";
import PersistLogin from "../auth/PersistLogin";

const SinglePostPage = () => {
  const { blogPostId } = useParams();

  const { isAdmin } = useAuth();
  const {
    token,
    isError: isErrorPersist,
    isLoading: isLoadingPersist,
    isSuccess: isSuccessPersist,
    isUninitialized,
    trueSuccess,
  } = PersistLogin();

  const {
    data: post,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetSinglePostQuery(blogPostId);

  // const { post, isLoading } = useGetPostsQuery("getPosts", {
  //   selectFromResult: ({ data, isLoading }) => ({
  //     post: data?.entities[postId],
  //     isLoading,
  //   }),
  // });

  // if (isLoading) return <p>Loading...</p>;

  // if (!post) {
  //   return (
  //     <section>
  //       <h2>Post not found!</h2>
  //     </section>
  //   );
  // }

  return (
    <article className="px-4 py-3 mx-auto xs:w-full sm:w-[525px] md:w-[600px] my-4">
      <h2 className="text-2xl mb-4 text-gray-800 tracking-wide">
        {post?.post.title}
      </h2>

      <div className="rounded-sm overflow-hidden mb-4">
        <img src={post?.post.imageURL} alt="image" />
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: post?.post.body }}
        className="font-light mb-6 tracking-wide text-lg"
      ></div>

      {isAdmin && token && (
        <p className="w-[100px] text-center mr-4 px-4 py-3 bg-green-700 shadow-md text-white rounded-md">
          <Link to={`/blog/edit/${post?.post._id}`}>Edit Post</Link>
        </p>
      )}
    </article>
  );
};

export default SinglePostPage;
