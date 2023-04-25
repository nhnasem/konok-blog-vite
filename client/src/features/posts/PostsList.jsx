import { useEffect, useState } from "react";
import PostsExcerpt from "./PostsExcerpt";
import { useGetPostsQuery } from "./postsSlice";

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
    // console.log("posts: ", posts?.posts?.length);
    setTotalPosts(posts?.totalPosts);
  }, [posts]);

  const doSomething = () => {
    setPageNumber(pageNumber + 1);
  };

  let loadMorePostsButton = (
    <button
      className="bg-[#25003e] text-white tracking-wider px-4 py-3 xs:w-[200px] xs:mx-auto my-4 border border-[#25003e] rounded-lg"
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
    content = posts.posts.map((post) => <PostsExcerpt post={post} />);
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <div className="transition-all duration-300 ease-in">
      <section className=" xs:w-full xs:mx-auto sm:flex sm:flex-row sm:flex-wrap sm:gap-4 sm:w-[full]">
        {content}
      </section>
      <div className="flex">{loadMorePostsButton}</div>
    </div>
  );
}
