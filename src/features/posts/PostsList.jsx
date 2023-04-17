import { useEffect, useState } from "react";
import PostsExcerpt from "./PostsExcerpt";
import { useGetPostsQuery } from "./postsSlice";
import { Link } from "react-router-dom";

export default function PostsList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery(pageNumber);

  useEffect(() => {
    console.log("posts: ", posts?.posts.length);
    setTotalPosts(posts?.totalPosts);
  }, [posts]);

  const doSomething = () => {
    setPageNumber(pageNumber + 1);
  };

  let loadMorePostsButton = (
    <button
      className="px-4 py-3 w-[150px] mx-auto my-4 border border-red-500 rounded-lg"
      onClick={() => doSomething()}
    >
      Load More
    </button>
  );
  if (pageNumber >= posts?.maxPageNumber) {
    loadMorePostsButton = null;
  }

  let content;
  // if (isLoading) {
  //   content = <p>"Loading..."</p>;
  // } else if (isSuccess) {
  //   content = posts.ids.map((postId) => (
  //     <PostsExcerpt key={postId} postId={postId} />
  //   ));
  // } else if (isError) {
  //   content = <p>{error}</p>;
  // }

  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = posts.posts.map((post) => (
      <Link to={`post/${post._id}`}>
        <PostsExcerpt post={post} />
      </Link>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <section className="flex flex-row flex-wrap w-[800px] mt-6">{content}</section>
      <div className="w-[800px] mx-auto">{loadMorePostsButton}</div>
    </div>
  );
}
